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

// Generate UUIDs for all entities to ensure compatibility with Supabase's uuid type
const clientIds = {
    client1: uuidv4(), client2: uuidv4(), client3: uuidv4(), client4: uuidv4(),
    client5: uuidv4(), client6: uuidv4(), client7: uuidv4()
};
const makeIds = {
    make1: uuidv4(), make2: uuidv4(), make3: uuidv4(), make4: uuidv4(),
    make5: uuidv4(), make6: uuidv4(), makeHonda: uuidv4()
};
const modelIds = {
    model1: uuidv4(), model2: uuidv4(), model13: uuidv4(), model3: uuidv4(),
    model4: uuidv4(), model14: uuidv4(), model5: uuidv4(), model15: uuidv4(),
    model6: uuidv4(), model7: uuidv4(), model8: uuidv4(), model9: uuidv4(),
    model10: uuidv4(), model11: uuidv4(), modelHondaAccord: uuidv4()
};
const carIds = {
    car1: uuidv4(), car2: uuidv4(), car3: uuidv4(), car4: uuidv4(),
    car5: uuidv4(), car6: uuidv4(), car7: uuidv4()
};
const categoryIds = {
    cat1: uuidv4(), cat2: uuidv4(), cat3: uuidv4(),
    cat4: uuidv4(), cat5: uuidv4(), cat6: uuidv4()
};
const findingIds = {
    find1: uuidv4(), find2: uuidv4(), find10: uuidv4(), find11: uuidv4(),
    find3: uuidv4(), find12: uuidv4(), find13: uuidv4(), find14: uuidv4(),
    find15: uuidv4(), find4: uuidv4(), find5: uuidv4(), find6: uuidv4(),
    find7: uuidv4(), find8: uuidv4(), find9: uuidv4()
};
const inspectionTypeIds = { insp1: uuidv4(), insp2: uuidv4(), insp3: uuidv4() };
const brokerIds = { broker1: uuidv4(), broker2: uuidv4() };

export const initialClients: Client[] = [
    { id: clientIds.client1, name: 'عميل تجريبي', phone: '0512345678' },
];

export const initialCarMakes: CarMake[] = [
    { id: makeIds.make1, nameAr: 'تويوتا', nameEn: 'Toyota' },
    { id: makeIds.make2, nameAr: 'هيونداي', nameEn: 'Hyundai' },
    { id: makeIds.make3, nameAr: 'فورد', nameEn: 'Ford' },
    { id: makeIds.make4, nameAr: 'نيسان', nameEn: 'Nissan' },
    { id: makeIds.make5, nameAr: 'مرسيدس-بنز', nameEn: 'Mercedes-Benz' },
    { id: makeIds.make6, nameAr: 'كيا', nameEn: 'KIA' },
    { id: makeIds.makeHonda, nameAr: 'هوندا', nameEn: 'Honda' },
];

export const initialCarModels: CarModel[] = [
    { id: modelIds.model1, makeId: makeIds.make1, nameAr: 'كامري', nameEn: 'Camry' },
    { id: modelIds.model2, makeId: makeIds.make1, nameAr: 'كورولا', nameEn: 'Corolla' },
    { id: modelIds.model13, makeId: makeIds.make1, nameAr: 'لاندكروزر', nameEn: 'Land Cruiser' },
    { id: modelIds.model3, makeId: makeIds.make2, nameAr: 'إلنترا', nameEn: 'Elantra' },
    { id: modelIds.model4, makeId: makeIds.make2, nameAr: 'أكسنت', nameEn: 'Accent' },
    { id: modelIds.model14, makeId: makeIds.make2, nameAr: 'توسان', nameEn: 'Tucson' },
    { id: modelIds.model5, makeId: makeIds.make3, nameAr: 'تورس', nameEn: 'Taurus' },
    { id: modelIds.model15, makeId: makeIds.make3, nameAr: 'إكسبلورر', nameEn: 'Explorer' },
    { id: modelIds.model6, makeId: makeIds.make4, nameAr: 'صني', nameEn: 'Sunny' },
    { id: modelIds.model7, makeId: makeIds.make4, nameAr: 'باترول', nameEn: 'Patrol' },
    { id: modelIds.model8, makeId: makeIds.make5, nameAr: 'الفئة E', nameEn: 'E-Class' },
    { id: modelIds.model9, makeId: makeIds.make5, nameAr: 'الفئة S', nameEn: 'S-Class' },
    { id: modelIds.model10, makeId: makeIds.make6, nameAr: 'ريو', nameEn: 'Rio' },
    { id: modelIds.model11, makeId: makeIds.make6, nameAr: 'سبورتاج', nameEn: 'Sportage' },
    { id: modelIds.modelHondaAccord, makeId: makeIds.makeHonda, nameAr: 'أكورد', nameEn: 'Accord' },
];

export const initialCars: Car[] = [
    { id: carIds.car1, makeId: makeIds.make1, modelId: modelIds.model1, year: 2022, plateNumber: 'ح ط ى 9876' },
];

export const initialCustomFindingCategories: CustomFindingCategory[] = [
    { id: categoryIds.cat1, name: 'البودي الخارجي' },
    { id: categoryIds.cat2, name: 'المحرك' },
    { id: categoryIds.cat3, name: 'نظام التعليق' },
    { id: categoryIds.cat4, name: 'نظام الفرامل' },
    { id: categoryIds.cat5, name: 'الإطارات' },
    { id: categoryIds.cat6, name: 'الشاصيه' },
];

export const initialPredefinedFindings: PredefinedFinding[] = [
    { id: findingIds.find1, categoryId: categoryIds.cat1, name: 'الصدام الأمامي', nameEn: 'Front Bumper', options: ['سليم', 'مرشوش', 'معجون', 'تالف'], referenceImage: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png' },
    { id: findingIds.find2, categoryId: categoryIds.cat1, name: 'الرفرف الأمامي يمين', nameEn: 'Front Right Fender', options: ['سليم', 'مرشوش', 'معجون', 'تالف'], referenceImage: 'https://i.imgur.com/g65a12B.png' },
    { id: findingIds.find10, categoryId: categoryIds.cat1, name: 'السقف', nameEn: 'Roof', options: ['سليم', 'مرشوش', 'متأثر بضربات برد', 'تالف'] },
    { id: findingIds.find11, categoryId: categoryIds.cat1, name: 'باب السائق', nameEn: 'Driver Door', options: ['سليم', 'مرشوش', 'معجون', 'تالف'] },
    { id: findingIds.find3, categoryId: categoryIds.cat2, name: 'تهريب زيت المحرك', nameEn: 'Engine Oil Leak', options: ['لا يوجد', 'يوجد تسريب', 'يوجد ترشيح'] },
    { id: findingIds.find12, categoryId: categoryIds.cat2, name: 'مستوى زيت المحرك', nameEn: 'Engine Oil Level', options: ['طبيعي', 'ناقص', 'زائد'] },
    { id: findingIds.find13, categoryId: categoryIds.cat2, name: 'حالة البطارية', nameEn: 'Battery Condition', options: ['جيدة', 'ضعيفة', 'تالفة'] },
    { id: findingIds.find14, categoryId: categoryIds.cat3, name: 'المساعدات الأمامية', nameEn: 'Front Shock Absorbers', options: ['جيدة', 'تحتاج تغيير', 'مهربة زيت'] },
    { id: findingIds.find15, categoryId: categoryIds.cat3, name: 'المساعدات الخلفية', nameEn: 'Rear Shock Absorbers', options: ['جيدة', 'تحتاج تغيير', 'مهربة زيت'] },
    { id: findingIds.find4, categoryId: categoryIds.cat4, name: 'فحص زيت الفرامل', nameEn: 'Brake Fluid Check', options: ['جيد', 'يحتاج تغيير'] },
    { id: findingIds.find5, categoryId: categoryIds.cat4, name: 'حالة الهوبات', nameEn: 'Rotor Condition', options: ['جيدة', 'تحتاج خرط', 'تحتاج تغيير'] },
    { id: findingIds.find6, categoryId: categoryIds.cat4, name: 'حالة الأقمشة', nameEn: 'Brake Pad Condition', options: ['جيدة', 'نصف عمر', 'تحتاج تغيير'] },
    { id: findingIds.find7, categoryId: categoryIds.cat5, name: 'الإطار الأمامي يمين', nameEn: 'Front Right Tire', options: ['جديد', 'جيد', 'نصف عمر', 'ممسوح'] },
    { id: findingIds.find8, categoryId: categoryIds.cat5, name: 'الإطار الخلفي يسار', nameEn: 'Rear Left Tire', options: ['جديد', 'جيد', 'نصف عمر', 'ممسوح'] },
    { id: findingIds.find9, categoryId: categoryIds.cat6, name: 'ضربة شاصي أمامي', nameEn: 'Front Chassis Damage', options: ['لا يوجد', 'يوجد'] },
];

export const initialInspectionTypes: InspectionType[] = [
    { id: inspectionTypeIds.insp1, name: 'Complete Diagnosis', price: 500, fields: [], findingCategoryIds: [categoryIds.cat1, categoryIds.cat2, categoryIds.cat3, categoryIds.cat4, categoryIds.cat5, categoryIds.cat6] },
    { id: inspectionTypeIds.insp2, name: 'فحص كمبيوتر', price: 150, fields: [], findingCategoryIds: [] },
    { id: inspectionTypeIds.insp3, name: 'فحص بودي وشاصيه', price: 250, fields: [], findingCategoryIds: [categoryIds.cat1, categoryIds.cat6] },
];

export const initialRequests: WorkshopRequest[] = [
    {
        id: 'sample-request-1',
        requestNumber: 1000,
        clientId: clientIds.client1,
        carId: carIds.car1,
        inspectionTypeId: inspectionTypeIds.insp1,
        paymentType: PaymentType.Card,
        price: 500,
        status: RequestStatus.InProgress,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
        employeeId: 'employee',
        inspectionData: {},
        generalNotes: [{id: 'sample-note-1', text: 'تم فحص السيارة بشكل مبدئي.'}],
        structuredFindings: [
            { findingId: findingIds.find1, findingName: 'الصدام الأمامي', value: 'مرشوش', categoryId: categoryIds.cat1 },
            { findingId: findingIds.find3, findingName: 'تهريب زيت المحرك', value: 'يوجد تسريب', categoryId: categoryIds.cat2 },
            { findingId: findingIds.find7, findingName: 'الإطار الأمامي يمين', value: 'نصف عمر', categoryId: categoryIds.cat5 },
        ],
        categoryNotes: {
            [categoryIds.cat1]: [{id: 'sample-cat-note-1', text: 'رش تجميلي فقط.'}]
        },
    }
];

export const initialEmployees: Employee[] = [
    { 
      id: 'admin', 
      name: 'المدير العام', 
      isGeneralManager: true, 
      permissions: { canCreateRequests: true, canManageClients: true, canViewReports: true, canAccessSettings: true },
      username: 'admin', 
      password: 'admin123', 
      profilePictureUrl: '' 
    },
    { 
      id: 'manager', 
      name: 'مدير الوردية', 
      isGeneralManager: false,
      permissions: { canCreateRequests: true, canManageClients: true, canViewReports: true, canAccessSettings: false },
      username: 'manager', 
      password: 'manager123', 
      profilePictureUrl: '' 
    },
    { 
      id: 'employee', 
      name: 'موظف فحص', 
      isGeneralManager: false,
      permissions: { canCreateRequests: true, canManageClients: false, canViewReports: false, canAccessSettings: false },
      username: 'employee', 
      password: 'emp123', 
      profilePictureUrl: '' 
    },
];

export const initialBrokers: Broker[] = [
    { id: brokerIds.broker1, brokerNumber: 1, name: 'سمسار الخير', phone: '0598765432', defaultCommission: 50, isActive: true },
    { id: brokerIds.broker2, brokerNumber: 2, name: 'سمسار آخر', phone: '0512345678', defaultCommission: 75, isActive: false },
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