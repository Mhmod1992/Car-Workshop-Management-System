import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Page, SettingsPage, Client, CarMake, CarModel, Car, InspectionType, WorkshopRequest, Employee, Broker, Settings, CustomFindingCategory, PredefinedFinding, Notification } from '../types.ts';
import { initialClients, initialCarMakes, initialCarModels, initialCars, initialInspectionTypes, initialRequests, initialEmployees, initialBrokers, initialSettings, initialCustomFindingCategories, initialPredefinedFindings } from '../constants.ts';
import { v4 as uuidv4 } from 'uuid';
import { supabase, isSupabaseConnected } from '../supabaseClient.ts';

// A deep merge utility to ensure settings from localStorage are hydrated with new defaults
function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target: any, source: any) {
    let output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}


interface ConfirmModalOptions {
    title: string;
    message: string;
    onConfirm: () => void;
}

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  settingsPage: SettingsPage;
  setSettingsPage: (page: SettingsPage) => void;
  selectedRequestId: string | null;
  setSelectedRequestId: (id: string | null) => void;
  
  // Data & Actions
  clients: Client[];
  addClient: (client: Client) => Promise<void>;
  updateClient: (client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  carMakes: CarMake[];
  addCarMake: (make: CarMake) => Promise<void>;
  addBatchCarMakes: (makes: CarMake[]) => Promise<void>;
  updateCarMake: (make: CarMake) => Promise<void>;
  deleteCarMake: (id: string) => Promise<void>;

  carModels: CarModel[];
  addCarModel: (model: CarModel) => Promise<void>;
  addBatchCarModels: (models: CarModel[]) => Promise<void>;
  updateCarModel: (model: CarModel) => Promise<void>;
  deleteCarModel: (id: string) => Promise<void>;
  
  cars: Car[];
  addCar: (car: Car) => Promise<void>;

  inspectionTypes: InspectionType[];
  addInspectionType: (type: InspectionType) => Promise<void>;
  updateInspectionType: (type: InspectionType) => Promise<void>;
  deleteInspectionType: (id: string) => Promise<void>;

  requests: WorkshopRequest[];
  addRequest: (request: WorkshopRequest) => Promise<void>;
  updateRequest: (request: WorkshopRequest) => Promise<void>;

  employees: Employee[];
  addEmployee: (employee: Employee) => Promise<void>;
  updateEmployee: (employee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;

  brokers: Broker[];
  addBroker: (broker: Broker) => Promise<void>;
  updateBroker: (broker: Broker) => Promise<void>;
  deleteBroker: (id: string) => Promise<void>;

  settings: Settings;
  updateSettings: (settings: Settings) => Promise<void>;

  customFindingCategories: CustomFindingCategory[];
  addCustomFindingCategory: (category: CustomFindingCategory) => Promise<void>;
  updateCustomFindingCategory: (category: CustomFindingCategory) => Promise<void>;
  deleteCustomFindingCategory: (id: string) => Promise<void>;

  predefinedFindings: PredefinedFinding[];
  addPredefinedFinding: (finding: PredefinedFinding) => Promise<void>;
  updatePredefinedFinding: (finding: PredefinedFinding) => Promise<void>;
  deletePredefinedFinding: (id: string) => Promise<void>;
  
  // Auth & UI
  authUser: Employee | null;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  showConfirmModal: (options: ConfirmModalOptions) => void;
  hideConfirmModal: () => void;
  confirmModal: {
    isOpen: boolean;
    options: ConfirmModalOptions | null;
  };
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('dashboard');
  const [settingsPage, setSettingsPage] = useState<SettingsPage>('general');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // State Management
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [carMakes, setCarMakes] = useState<CarMake[]>(initialCarMakes);
  const [carModels, setCarModels] = useState<CarModel[]>(initialCarModels);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [inspectionTypes, setInspectionTypes] = useState<InspectionType[]>(initialInspectionTypes);
  const [requests, setRequests] = useState<WorkshopRequest[]>(initialRequests);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [brokers, setBrokers] = useState<Broker[]>(initialBrokers);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [customFindingCategories, setCustomFindingCategories] = useState<CustomFindingCategory[]>(initialCustomFindingCategories);
  const [predefinedFindings, setPredefinedFindings] = useState<PredefinedFinding[]>(initialPredefinedFindings);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; options: ConfirmModalOptions | null }>({
    isOpen: false,
    options: null,
  });

  const showConfirmModal = (options: ConfirmModalOptions) => setConfirmModal({ isOpen: true, options });
  const hideConfirmModal = () => setConfirmModal({ isOpen: false, options: null });
  const addNotification = (notification: Omit<Notification, 'id'>) => setNotifications(prev => [...prev, { id: uuidv4(), ...notification }]);
  const removeNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));
  const [authUser, setAuthUser] = useState<Employee | null>(null);

  // Fetch data from Supabase on initial load
  useEffect(() => {
    if (!isSupabaseConnected) {
      console.log("Supabase not connected, running in local mode.");
      return;
    }

    const fetchData = async () => {
      // Helper to fetch or seed data
      const fetchOrSeed = async (tableName: string, setter: Function, initialData: any[]) => {
        const { data, error } = await supabase.from(tableName).select('*');
        if (error) {
          console.error(`Error fetching ${tableName}:`, error.message);
          let userFriendlyMessage = `(${tableName}) ${error.message}`;
          if (error.message.includes('schema cache')) {
            userFriendlyMessage = `جدول (${tableName}) غير موجود. تأكد من تشغيل سكربت إعداد قاعدة البيانات في لوحة تحكم Supabase.`;
          }
          addNotification({ title: 'خطأ في تحميل البيانات', message: userFriendlyMessage, type: 'error' });
          return;
        }
        if (data && data.length > 0) {
          setter(data);
        } else {
          console.log(`Seeding ${tableName}...`);
          const { error: insertError } = await supabase.from(tableName).insert(initialData);
          if (insertError) {
              console.error(`Error seeding ${tableName}:`, insertError.message);
              let userFriendlyMessage = `(${tableName}) ${insertError.message}`;
              // Check for RLS violation message
              if (insertError.message.includes('row-level security') || insertError.message.includes('RLS')) {
                  userFriendlyMessage = `فشل الوصول إلى جدول (${tableName}). قد تكون ميزة أمان (RLS) مفعلة. الرجاء تعطيلها من لوحة تحكم Supabase أو إنشاء سياسة (Policy) للسماح بالوصول.`;
              }
              addNotification({ title: 'خطأ في إعداد البيانات الأولية', message: userFriendlyMessage, type: 'error' });
          }
          else setter(initialData);
        }
      };

      await Promise.all([
          fetchOrSeed('clients', setClients, initialClients),
          fetchOrSeed('car_makes', setCarMakes, initialCarMakes),
          fetchOrSeed('car_models', setCarModels, initialCarModels),
          fetchOrSeed('cars', setCars, initialCars),
          fetchOrSeed('inspection_types', setInspectionTypes, initialInspectionTypes),
          fetchOrSeed('requests', setRequests, initialRequests),
          fetchOrSeed('employees', setEmployees, initialEmployees),
          fetchOrSeed('brokers', setBrokers, initialBrokers),
          fetchOrSeed('custom_finding_categories', setCustomFindingCategories, initialCustomFindingCategories),
          fetchOrSeed('predefined_findings', setPredefinedFindings, initialPredefinedFindings)
      ]);

      // Special handling for settings (single row table)
      const { data: settingsData, error: settingsError } = await supabase.from('settings').select('*').limit(1);
        if (settingsError) {
             addNotification({ title: 'خطأ في تحميل الإعدادات', message: settingsError.message, type: 'error' });
        } else if (settingsData && settingsData.length > 0) {
            const mergedSettings = mergeDeep(initialSettings, settingsData[0].data);
            setSettings(mergedSettings);
        } else {
            const { error: insertError } = await supabase.from('settings').insert({ id: 1, data: initialSettings });
            if (insertError) {
                addNotification({ title: 'خطأ في حفظ الإعدادات الأولية', message: insertError.message, type: 'error' });
            } else {
                setSettings(initialSettings);
            }
        }
    };

    fetchData();
  }, []);

  // --- Data Mutation Functions ---
  const createDbHandler = <T extends { id: string }>(tableName: string, stateSetter: React.Dispatch<React.SetStateAction<T[]>>) => ({
      add: async (item: T) => {
          if (isSupabaseConnected) {
              const { error } = await supabase.from(tableName).insert(item);
              if (error) { addNotification({ type: 'error', title: 'Supabase Error', message: error.message }); return; }
          }
          stateSetter(prev => [...prev, item]);
      },
      addBatch: async (items: T[]) => {
          if (isSupabaseConnected) {
              const { error } = await supabase.from(tableName).insert(items);
              if (error) { addNotification({ type: 'error', title: 'Supabase Error', message: error.message }); return; }
          }
          stateSetter(prev => [...prev, ...items]);
      },
      update: async (item: T) => {
          if (isSupabaseConnected) {
              const { error } = await supabase.from(tableName).update(item).eq('id', item.id);
              if (error) { addNotification({ type: 'error', title: 'Supabase Error', message: error.message }); return; }
          }
          stateSetter(prev => prev.map(i => i.id === item.id ? item : i));
      },
      delete: async (id: string) => {
          if (isSupabaseConnected) {
              const { error } = await supabase.from(tableName).delete().eq('id', id);
              if (error) { addNotification({ type: 'error', title: 'Supabase Error', message: error.message }); return; }
          }
          stateSetter(prev => prev.filter(i => i.id !== id));
      }
  });

  const clientHandler = createDbHandler('clients', setClients);
  const carMakeHandler = createDbHandler('car_makes', setCarMakes);
  const carModelHandler = createDbHandler('car_models', setCarModels);
  const carHandler = createDbHandler('cars', setCars);
  const inspectionTypeHandler = createDbHandler('inspection_types', setInspectionTypes);
  const requestHandler = createDbHandler('requests', setRequests);
  const employeeHandler = createDbHandler('employees', setEmployees);
  const brokerHandler = createDbHandler('brokers', setBrokers);
  const customFindingCategoryHandler = createDbHandler('custom_finding_categories', setCustomFindingCategories);
  const predefinedFindingHandler = createDbHandler('predefined_findings', setPredefinedFindings);
  
  const updateSettings = async (newSettings: Settings) => {
      if (isSupabaseConnected) {
          const { error } = await supabase.from('settings').update({ data: newSettings }).eq('id', 1);
          if (error) { addNotification({ type: 'error', title: 'Supabase Error', message: error.message }); return; }
      }
      setSettings(newSettings);
  };

  const login = (username: string, password?: string): boolean => {
    const user = employees.find(e => e.username === username && e.password === password);
    if (user) {
      setAuthUser(user);
      setPage('dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthUser(null);
  };

  const value: AppContextType = {
    page, setPage, settingsPage, setSettingsPage, selectedRequestId, setSelectedRequestId,
    clients, addClient: clientHandler.add, updateClient: clientHandler.update, deleteClient: clientHandler.delete,
    carMakes, addCarMake: carMakeHandler.add, addBatchCarMakes: carMakeHandler.addBatch, updateCarMake: carMakeHandler.update, deleteCarMake: carMakeHandler.delete,
    carModels, addCarModel: carModelHandler.add, addBatchCarModels: carModelHandler.addBatch, updateCarModel: carModelHandler.update, deleteCarModel: carModelHandler.delete,
    cars, addCar: carHandler.add,
    inspectionTypes, addInspectionType: inspectionTypeHandler.add, updateInspectionType: inspectionTypeHandler.update, deleteInspectionType: inspectionTypeHandler.delete,
    requests, addRequest: requestHandler.add, updateRequest: requestHandler.update,
    employees, addEmployee: employeeHandler.add, updateEmployee: employeeHandler.update, deleteEmployee: employeeHandler.delete,
    brokers, addBroker: brokerHandler.add, updateBroker: brokerHandler.update, deleteBroker: brokerHandler.delete,
    settings, updateSettings,
    customFindingCategories, addCustomFindingCategory: customFindingCategoryHandler.add, updateCustomFindingCategory: customFindingCategoryHandler.update, deleteCustomFindingCategory: customFindingCategoryHandler.delete,
    predefinedFindings, addPredefinedFinding: predefinedFindingHandler.add, updatePredefinedFinding: predefinedFindingHandler.update, deletePredefinedFinding: predefinedFindingHandler.delete,
    authUser, login, logout,
    showConfirmModal, hideConfirmModal, confirmModal,
    notifications, addNotification, removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};