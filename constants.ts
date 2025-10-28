import {
  Client,
  CarMake,
  CarModel,
  Car,
  InspectionType,
  WorkshopRequest,
  RequestStatus,
  PaymentType,
  Employee,
  Broker,
  Settings,
  CustomFindingCategory,
  PredefinedFinding,
  ReportBlock,
} from './types.ts';
import { v4 as uuidv4 } from 'uuid';

// --- IDs for initial seed data ---
// By defining these as top-level constants, we ensure the same UUID is used across different initial data arrays,
// preventing foreign key constraint violations during the seeding process.

// Core Entities
const SEED_CLIENT_1_ID = uuidv4();
const SEED_CAR_1_ID = uuidv4();
const SEED_REQUEST_1_ID = uuidv4();

// Relational Data for Car
const SEED_MAKE_TOYOTA_ID = uuidv4();
const SEED_MAKE_HYUNDAI_ID = uuidv4();
const SEED_MAKE_FORD_ID = uuidv4();
const SEED_MAKE_NISSAN_ID = uuidv4();
const SEED_MAKE_MERCEDES_ID = uuidv4();
const SEED_MAKE_KIA_ID = uuidv4();
const SEED_MAKE_HONDA_ID = uuidv4();

const SEED_MODEL_CAMRY_ID = uuidv4();
const SEED_MODEL_COROLLA_ID = uuidv4();
const SEED_MODEL_LANDCRUISER_ID = uuidv4();
const SEED_MODEL_ELANTRA_ID = uuidv4();
const SEED_MODEL_ACCENT_ID = uuidv4();
const SEED_MODEL_TUCSON_ID = uuidv4();
const SEED_MODEL_TAURUS_ID = uuidv4();
const SEED_MODEL_EXPLORER_ID = uuidv4();
const SEED_MODEL_SUNNY_ID = uuidv4();
const SEED_MODEL_PATROL_ID = uuidv4();
const SEED_MODEL_ECLASS_ID = uuidv4();
const SEED_MODEL_SCLASS_ID = uuidv4();
const SEED_MODEL_RIO_ID = uuidv4();
const SEED_MODEL_SPORTAGE_ID = uuidv4();
const SEED_MODEL_ACCORD_ID = uuidv4();

// Inspection Data
const SEED_CAT_BODY_ID = uuidv4();
const SEED_CAT_ENGINE_ID = uuidv4();
const SEED_CAT_SUSPENSION_ID = uuidv4();
const SEED_CAT_BRAKES_ID = uuidv4();
const SEED_CAT_TIRES_ID = uuidv4();
const SEED_CAT_CHASSIS_ID = uuidv4();

const SEED_FIND_FRONT_BUMPER_ID = uuidv4();
const SEED_FIND_RIGHT_FENDER_ID = uuidv4();
const SEED_FIND_ROOF_ID = uuidv4();
const SEED_FIND_DRIVER_DOOR_ID = uuidv4();
const SEED_FIND_ENGINE_OIL_LEAK_ID = uuidv4();
const SEED_FIND_ENGINE_OIL_LEVEL_ID = uuidv4();
const SEED_FIND_BATTERY_ID = uuidv4();
const SEED_FIND_FRONT_SHOCKS_ID = uuidv4();
const SEED_FIND_REAR_SHOCKS_ID = uuidv4();
const SEED_FIND_BRAKE_FLUID_ID = uuidv4();
const SEED_FIND_ROTORS_ID = uuidv4();
const SEED_FIND_BRAKE_PADS_ID = uuidv4();
const SEED_FIND_FRONT_RIGHT_TIRE_ID = uuidv4();
const SEED_FIND_REAR_LEFT_TIRE_ID = uuidv4();
const SEED_FIND_CHASSIS_DAMAGE_ID = uuidv4();

const SEED_INSP_TYPE_COMPLETE_ID = uuidv4();
const SEED_INSP_TYPE_COMPUTER_ID = uuidv4();
const SEED_INSP_TYPE_BODY_ID = uuidv4();

// People & Organizations
const SEED_EMPLOYEE_ADMIN_ID = uuidv4();
const SEED_EMPLOYEE_MANAGER_ID = uuidv4();
const SEED_EMPLOYEE_INSPECTOR_ID = uuidv4();
const SEED_BROKER_1_ID = uuidv4();
const SEED_BROKER_2_ID = uuidv4();

// Notes
const SEED_NOTE_GENERAL_1_ID = uuidv4();
const SEED_NOTE_CATEGORY_1_ID = uuidv4();

// --- Initial Data Arrays ---

export const initialClients: Client[] = [
    { id: SEED_CLIENT_1_ID, name: 'عميل تجريبي', phone: '0512345678' },
];

export const initialCarMakes: CarMake[] = [
    { id: SEED_MAKE_TOYOTA_ID, nameAr: 'تويوتا', nameEn: 'Toyota' },
    { id: SEED_MAKE_HYUNDAI_ID, nameAr: 'هيونداي', nameEn: 'Hyundai' },
    { id: SEED_MAKE_FORD_ID, nameAr: 'فورد', nameEn: 'Ford' },
    { id: SEED_MAKE_NISSAN_ID, nameAr: 'نيسان', nameEn: 'Nissan' },
    { id: SEED_MAKE_MERCEDES_ID, nameAr: 'مرسيدس-بنز', nameEn: 'Mercedes-Benz' },
    { id: SEED_MAKE_KIA_ID, nameAr: 'كيا', nameEn: 'KIA' },
    { id: SEED_MAKE_HONDA_ID, nameAr: 'هوندا', nameEn: 'Honda' },
];

export const initialCarModels: CarModel[] = [
    { id: SEED_MODEL_CAMRY_ID, makeId: SEED_MAKE_TOYOTA_ID, nameAr: 'كامري', nameEn: 'Camry' },
    { id: SEED_MODEL_COROLLA_ID, makeId: SEED_MAKE_TOYOTA_ID, nameAr: 'كورولا', nameEn: 'Corolla' },
    { id: SEED_MODEL_LANDCRUISER_ID, makeId: SEED_MAKE_TOYOTA_ID, nameAr: 'لاندكروزر', nameEn: 'Land Cruiser' },
    { id: SEED_MODEL_ELANTRA_ID, makeId: SEED_MAKE_HYUNDAI_ID, nameAr: 'إلنترا', nameEn: 'Elantra' },
    { id: SEED_MODEL_ACCENT_ID, makeId: SEED_MAKE_HYUNDAI_ID, nameAr: 'أكسنت', nameEn: 'Accent' },
    { id: SEED_MODEL_TUCSON_ID, makeId: SEED_MAKE_HYUNDAI_ID, nameAr: 'توسان', nameEn: 'Tucson' },
    { id: SEED_MODEL_TAURUS_ID, makeId: SEED_MAKE_FORD_ID, nameAr: 'تورس', nameEn: 'Taurus' },
    { id: SEED_MODEL_EXPLORER_ID, makeId: SEED_MAKE_FORD_ID, nameAr: 'إكسبلورر', nameEn: 'Explorer' },
    { id: SEED_MODEL_SUNNY_ID, makeId: SEED_MAKE_NISSAN_ID, nameAr: 'صني', nameEn: 'Sunny' },
    { id: SEED_MODEL_PATROL_ID, makeId: SEED_MAKE_NISSAN_ID, nameAr: 'باترول', nameEn: 'Patrol' },
    { id: SEED_MODEL_ECLASS_ID, makeId: SEED_MAKE_MERCEDES_ID, nameAr: 'الفئة E', nameEn: 'E-Class' },
    { id: SEED_MODEL_SCLASS_ID, makeId: SEED_MAKE_MERCEDES_ID, nameAr: 'الفئة S', nameEn: 'S-Class' },
    { id: SEED_MODEL_RIO_ID, makeId: SEED_MAKE_KIA_ID, nameAr: 'ريو', nameEn: 'Rio' },
    { id: SEED_MODEL_SPORTAGE_ID, makeId: SEED_MAKE_KIA_ID, nameAr: 'سبورتاج', nameEn: 'Sportage' },
    { id: SEED_MODEL_ACCORD_ID, makeId: SEED_MAKE_HONDA_ID, nameAr: 'أكورد', nameEn: 'Accord' },
];

export const initialCars: Car[] = [
    { id: SEED_CAR_1_ID, makeId: SEED_MAKE_TOYOTA_ID, modelId: SEED_MODEL_CAMRY_ID, year: 2022, plateNumber: 'ح ط ى 9876' },
];

export const initialCustomFindingCategories: CustomFindingCategory[] = [
    { id: SEED_CAT_BODY_ID, name: 'البودي الخارجي' },
    { id: SEED_CAT_ENGINE_ID, name: 'المحرك' },
    { id: SEED_CAT_SUSPENSION_ID, name: 'نظام التعليق' },
    { id: SEED_CAT_BRAKES_ID, name: 'نظام الفرامل' },
    { id: SEED_CAT_TIRES_ID, name: 'الإطارات' },
    { id: SEED_CAT_CHASSIS_ID, name: 'الشاصيه' },
];

export const initialPredefinedFindings: PredefinedFinding[] = [
    { id: SEED_FIND_FRONT_BUMPER_ID, categoryId: SEED_CAT_BODY_ID, name: 'الصدام الأمامي', nameEn: 'Front Bumper', options: ['سليم', 'مرشوش', 'معجون', 'تالف'], referenceImage: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' },
    { id: SEED_FIND_RIGHT_FENDER_ID, categoryId: SEED_CAT_BODY_ID, name: 'الرفرف الأمامي يمين', nameEn: 'Front Right Fender', options: ['سليم', 'مرشوش', 'معجون', 'تالف'], referenceImage: 'https://i.imgur.com/g65a12B.png' },
    { id: SEED_FIND_ROOF_ID, categoryId: SEED_CAT_BODY_ID, name: 'السقف', nameEn: 'Roof', options: ['سليم', 'مرشوش', 'متأثر بضربات برد', 'تالف'] },
    { id: SEED_FIND_DRIVER_DOOR_ID, categoryId: SEED_CAT_BODY_ID, name: 'باب السائق', nameEn: 'Driver Door', options: ['سليم', 'مرشوش', 'معجون', 'تالف'] },
    { id: SEED_FIND_ENGINE_OIL_LEAK_ID, categoryId: SEED_CAT_ENGINE_ID, name: 'تهريب زيت المحرك', nameEn: 'Engine Oil Leak', options: ['لا يوجد', 'يوجد تسريب', 'يوجد ترشيح'] },
    { id: SEED_FIND_ENGINE_OIL_LEVEL_ID, categoryId: SEED_CAT_ENGINE_ID, name: 'مستوى زيت المحرك', nameEn: 'Engine Oil Level', options: ['طبيعي', 'ناقص', 'زائد'] },
    { id: SEED_FIND_BATTERY_ID, categoryId: SEED_CAT_ENGINE_ID, name: 'حالة البطارية', nameEn: 'Battery Condition', options: ['جيدة', 'ضعيفة', 'تالفة'] },
    { id: SEED_FIND_FRONT_SHOCKS_ID, categoryId: SEED_CAT_SUSPENSION_ID, name: 'المساعدات الأمامية', nameEn: 'Front Shock Absorbers', options: ['جيدة', 'تحتاج تغيير', 'مهربة زيت'] },
    { id: SEED_FIND_REAR_SHOCKS_ID, categoryId: SEED_CAT_SUSPENSION_ID, name: 'المساعدات الخلفية', nameEn: 'Rear Shock Absorbers', options: ['جيدة', 'تحتاج تغيير', 'مهربة زيت'] },
    { id: SEED_FIND_BRAKE_FLUID_ID, categoryId: SEED_CAT_BRAKES_ID, name: 'فحص زيت الفرامل', nameEn: 'Brake Fluid Check', options: ['جيد', 'يحتاج تغيير'] },
    { id: SEED_FIND_ROTORS_ID, categoryId: SEED_CAT_BRAKES_ID, name: 'حالة الهوبات', nameEn: 'Rotor Condition', options: ['جيدة', 'تحتاج خرط', 'تحتاج تغيير'] },
    { id: SEED_FIND_BRAKE_PADS_ID, categoryId: SEED_CAT_BRAKES_ID, name: 'حالة الأقمشة', nameEn: 'Brake Pad Condition', options: ['جيدة', 'نصف عمر', 'تحتاج تغيير'] },
    { id: SEED_FIND_FRONT_RIGHT_TIRE_ID, categoryId: SEED_CAT_TIRES_ID, name: 'الإطار الأمامي يمين', nameEn: 'Front Right Tire', options: ['جديد', 'جيد', 'نصف عمر', 'ممسوح'] },
    { id: SEED_FIND_REAR_LEFT_TIRE_ID, categoryId: SEED_CAT_TIRES_ID, name: 'الإطار الخلفي يسار', nameEn: 'Rear Left Tire', options: ['جديد', 'جيد', 'نصف عمر', 'ممسوح'] },
    { id: SEED_FIND_CHASSIS_DAMAGE_ID, categoryId: SEED_CAT_CHASSIS_ID, name: 'ضربة شاصي أمامي', nameEn: 'Front Chassis Damage', options: ['لا يوجد', 'يوجد'] },
];

export const initialInspectionTypes: InspectionType[] = [
    { id: SEED_INSP_TYPE_COMPLETE_ID, name: 'Complete Diagnosis', price: 500, fields: [], findingCategoryIds: [SEED_CAT_BODY_ID, SEED_CAT_ENGINE_ID, SEED_CAT_SUSPENSION_ID, SEED_CAT_BRAKES_ID, SEED_CAT_TIRES_ID, SEED_CAT_CHASSIS_ID] },
    { id: SEED_INSP_TYPE_COMPUTER_ID, name: 'فحص كمبيوتر', price: 150, fields: [], findingCategoryIds: [] },
    { id: SEED_INSP_TYPE_BODY_ID, name: 'فحص بودي وشاصيه', price: 250, fields: [], findingCategoryIds: [SEED_CAT_BODY_ID, SEED_CAT_CHASSIS_ID] },
];

export const initialRequests: WorkshopRequest[] = [
    {
        id: SEED_REQUEST_1_ID,
        requestNumber: 1000,
        clientId: SEED_CLIENT_1_ID,
        carId: SEED_CAR_1_ID,
        inspectionTypeId: SEED_INSP_TYPE_COMPLETE_ID,
        paymentType: PaymentType.Card,
        price: 500,
        status: RequestStatus.InProgress,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        employeeId: SEED_EMPLOYEE_INSPECTOR_ID,
        inspectionData: {},
        generalNotes: [{id: SEED_NOTE_GENERAL_1_ID, text: 'تم فحص السيارة بشكل مبدئي.'}],
        structuredFindings: [
            { findingId: SEED_FIND_FRONT_BUMPER_ID, findingName: 'الصدام الأمامي', value: 'مرشوش', categoryId: SEED_CAT_BODY_ID },
            { findingId: SEED_FIND_ENGINE_OIL_LEAK_ID, findingName: 'تهريب زيت المحرك', value: 'يوجد تسريب', categoryId: SEED_CAT_ENGINE_ID },
            { findingId: SEED_FIND_FRONT_RIGHT_TIRE_ID, findingName: 'الإطار الأمامي يمين', value: 'نصف عمر', categoryId: SEED_CAT_TIRES_ID },
        ],
        categoryNotes: {
            [SEED_CAT_BODY_ID]: [{id: SEED_NOTE_CATEGORY_1_ID, text: 'رش تجميلي فقط.'}]
        },
    }
];

export const initialEmployees: Employee[] = [
    { 
      id: SEED_EMPLOYEE_ADMIN_ID, 
      name: 'المدير العام', 
      isGeneralManager: true, 
      permissions: { canCreateRequests: true, canManageClients: true, canViewReports: true, canAccessSettings: true },
      username: 'admin', 
      password: 'admin123', 
      profilePictureUrl: '' 
    },
    { 
      id: SEED_EMPLOYEE_MANAGER_ID, 
      name: 'مدير الوردية', 
      isGeneralManager: false,
      permissions: { canCreateRequests: true, canManageClients: true, canViewReports: true, canAccessSettings: false },
      username: 'manager', 
      password: 'manager123', 
      profilePictureUrl: '' 
    },
    { 
      id: SEED_EMPLOYEE_INSPECTOR_ID, 
      name: 'موظف فحص', 
      isGeneralManager: false,
      permissions: { canCreateRequests: true, canManageClients: false, canViewReports: false, canAccessSettings: false },
      username: 'employee', 
      password: 'emp123', 
      profilePictureUrl: '' 
    },
];

export const initialBrokers: Broker[] = [
    { id: SEED_BROKER_1_ID, brokerNumber: 1, name: 'سمسار الخير', phone: '0598765432', defaultCommission: 50, isActive: true },
    { id: SEED_BROKER_2_ID, brokerNumber: 2, name: 'سمسار آخر', phone: '0512345678', defaultCommission: 75, isActive: false },
];


const defaultReportTemplate: ReportBlock[] = [
    {
        id: 'header-new',
        type: 'HEADER',
        properties: {
            showAppName: true,
            showLogo: true,
            headerText: 'تقرير فحص المركبة\nVehicle Inspection Report',
            styles: { textAlign: 'right', padding: '0 0 16px 0', borderWidth: '0 0 2 0', borderStyle: 'solid', borderColor: '#1E3A8A' }
        }
    },
    { id: 'spacer-1', type: 'SPACER', properties: { height: 20 } },
    {
        id: 'request-info-grid',
        type: 'DATA_GRID',
        properties: {
            title: 'معلومات التقرير والعميل',
            titleStyles: { fontSize: '18px', fontWeight: 'bold', color: '#1E3A8A', margin: '0 0 16px 0', padding: '0 0 8px 0', borderWidth: '0 0 1 0', borderStyle: 'solid', borderColor: '#D1D5DB' },
            containerHeight: 90,
            gridFields: [
                { key: 'requestNumber', label: 'رقم التقرير:', showLabel: true, showValue: true, labelPart: { x: 670, y: 0, width: 90, height: 25, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 500, y: 0, width: 170, height: 25, styles: { textAlign: 'right'} } },
                { key: 'date', label: 'التاريخ:', showLabel: true, showValue: true, labelPart: { x: 670, y: 30, width: 90, height: 25, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 450, y: 30, width: 220, height: 25, styles: { textAlign: 'right'} } },
                { key: 'employeeName', label: 'الفاحص:', showLabel: true, showValue: true, labelPart: { x: 670, y: 60, width: 90, height: 25, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 500, y: 60, width: 170, height: 25, styles: { textAlign: 'right'} } },
                { key: 'clientName', label: 'اسم العميل:', showLabel: true, showValue: true, labelPart: { x: 300, y: 0, width: 100, height: 25, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 50, y: 0, width: 250, height: 25, styles: { textAlign: 'right'} } },
                { key: 'clientPhone', label: 'رقم الهاتف:', showLabel: true, showValue: true, labelPart: { x: 300, y: 30, width: 100, height: 25, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 50, y: 30, width: 250, height: 25, styles: { textAlign: 'right'} } },
            ],
            styles: { borderWidth: '1', borderStyle: 'solid', borderColor: '#E5E7EB', padding: '16px', borderRadius: '8' }
        }
    },
    { id: 'spacer-2', type: 'SPACER', properties: { height: 20 } },
    {
        id: 'vehicle-info-grid',
        type: 'DATA_GRID',
        properties: {
            title: 'بيانات المركبة',
            titleStyles: { fontSize: '18px', fontWeight: 'bold', color: '#1E3A8A', margin: '0 0 16px 0', padding: '0 0 8px 0', borderWidth: '0 0 1 0', borderStyle: 'solid', borderColor: '#D1D5DB' },
            containerHeight: 60,
            carNameLanguage: 'both',
            gridFields: [
                { key: ['make', 'model', 'year'], label: 'المركبة:', showLabel: true, showValue: true, labelPart: { x: 650, y: 0, width: 110, height: 40, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 250, y: 0, width: 400, height: 40, styles: { textAlign: 'right'} } },
                { key: 'plate', label: 'اللوحة/الشاصي:', showLabel: true, showValue: true, labelPart: { x: 200, y: 0, width: 150, height: 40, styles: { textAlign: 'right', fontWeight: 'bold'} }, valuePart: { x: 10, y: 0, width: 190, height: 40, styles: { textAlign: 'right'} } },
            ],
            styles: { borderWidth: '1', borderStyle: 'solid', borderColor: '#E5E7EB', padding: '16px', borderRadius: '8' }
        }
    },
    { id: 'spacer-3', type: 'SPACER', properties: { height: 20 } },
    {
        id: 'findings-summary',
        type: 'FINDINGS_SUMMARY',
        properties: {
            summaryTitle: 'ملخص أهم الملاحظات',
            criticalValues: ['تالف', 'يوجد', 'يوجد تسريب', 'تحتاج تغيير', 'ممسوح', 'معجون']
        }
    },
    { id: 'spacer-4', type: 'SPACER', properties: { height: 10 } },
    {
        id: 'main-findings-table',
        type: 'FINDINGS_TABLE',
        properties: {
            findingCategoryId: 'ALL', 
            findingLayout: 'cards',
            imageVisibility: true,
            imageSize: 'medium',
            imagePosition: 'left',
            showFindingIcons: true,
            iconsByValue: [
                { value: 'سليم', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'جديد', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'جيدة', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'جيد', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'لا يوجد', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'طبيعي', icon: 'check-circle-solid', color: '#16A34A' },
                { value: 'تالف', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'تالفة', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'يوجد', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'يوجد تسريب', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'تحتاج تغيير', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'ممسوح', icon: 'x-circle-solid', color: '#DC2626' },
                { value: 'مرشوش', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
                { value: 'معجون', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
                { value: 'نصف عمر', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
                { value: 'يوجد ترشيح', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
                { value: 'ناقص', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
                { value: 'ضعيفة', icon: 'exclamation-triangle-solid', color: '#F59E0B' },
            ],
            styles: { borderColor: '#E5E7EB' }
        }
    },
    { id: 'spacer-5', type: 'SPACER', properties: { height: 10 } },
    { id: 'page-break-1', type: 'PAGE_BREAK', properties: {} },
    { id: 'spacer-6', type: 'SPACER', properties: { height: 20 } },
    {
        id: 'general-notes-title',
        type: 'SECTION_TITLE',
        properties: { text: 'ملاحظات عامة', styles: { fontSize: '18px', fontWeight: 'bold', color: '#1E3A8A', margin: '0 0 8px 0' } }
    },
    {
        id: 'general-notes',
        type: 'NOTES',
        properties: {
            noteType: 'general',
            styles: { borderWidth: '1', borderStyle: 'solid', borderColor: '#E5E7EB', padding: '12px', borderRadius: '8' }
        }
    },
    { id: 'spacer-7', type: 'SPACER', properties: { height: 50 } },
    {
        id: 'signatures',
        type: 'SIGNATURES',
        properties: {
            numSignatures: 2,
            signatureTitles: ['توقيع الفاحص', 'توقيع العميل']
        }
    }
];

export const initialSettings: Settings = {
    appName: 'ورشة الفحص الفني',
    logoUrl: '',
    plateCharacters: [
        { ar: 'ا', en: 'A' }, { ar: 'ب', en: 'B' }, { ar: 'ح', en: 'J' }, { ar: 'د', en: 'D' },
        { ar: 'ر', en: 'R' }, { ar: 'س', en: 'S' }, { ar: 'ص', en: 'X' }, { ar: 'ط', en: 'T' },
        { ar: 'ع', en: 'E' }, { ar: 'ق', en: 'G' }, { ar: 'ك', en: 'K' }, { ar: 'ل', en: 'L' },
        { ar: 'م', en: 'Z' }, { ar: 'ن', en: 'N' }, { ar: 'هـ', en: 'H' }, { ar: 'و', en: 'U' },
        { ar: 'ى', en: 'V' },
    ],
    platePreviewSettings: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        fontColor: '#000000',
        fontFamily: "'Courier New', monospace",
        fontSize: '32px',
        letterSpacing: '4px',
        separatorImageUrl: '',
        separatorWidth: 'auto',
        separatorHeight: '40px',
    },
    reportPageSettings: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        marginLeft: 20,
    },
    reportTemplate: defaultReportTemplate
};
