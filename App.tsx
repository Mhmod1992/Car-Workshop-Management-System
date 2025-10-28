import React from 'react';
import { useAppContext } from './context/AppContext.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Icon from './components/Icon.tsx';
import ConfirmModal from './components/ConfirmModal.tsx';
import NotificationContainer from './components/NotificationContainer.tsx';
import Dashboard from './pages/Dashboard.tsx';
import RequestsList from './pages/RequestsList.tsx';
import NewRequestForm from './pages/NewRequestForm.tsx';
import ClientsManagement from './pages/ClientsManagement.tsx';
import Settings from './pages/Settings.tsx';
import FillRequestForm from './pages/FillRequestForm.tsx';
import PrintReportPage from './pages/PrintReportPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

const App: React.FC = () => {
  const {
    page,
    authUser,
    setPage,
    requests,
    confirmModal,
    hideConfirmModal,
    selectedRequestId,
  } = useAppContext();

  // ✅ تم تصحيح هذا السطر باستخدام صيغة يفهمها المترجم بشكل أفضل
  const pageTitles: { [key: string]: string } = {
    dashboard: 'لوحة التحكم الرئيسية',
    requests: 'قائمة الطلبات',
    'new-request': 'إنشاء طلب جديد',
    'fill-request': 'تعبئة طلب',
    'print-report': 'معاينة وتعديل التقرير',
    clients: 'إدارة العملاء',
    reports: 'التقارير',
    settings: 'الإعدادات',
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'requests':
        return <RequestsList />;
      case 'new-request':
        return <NewRequestForm />;
      case 'fill-request':
        return <FillRequestForm />;
      case 'print-report':
        return <PrintReportPage />;
      case 'clients':
        return <ClientsManagement />;
      case 'reports':
        return <RequestsList />; // Reports page reuses the requests list with its filters
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!authUser) {
    return <LoginPage />;
  }

  // توليد العنوان الديناميكي للصفحة
  let currentPageTitle = pageTitles[page] || 'نظام الورشة';
  if (page === 'fill-request' || page === 'print-report') {
    const requestNumber = requests.find(
      (r) => r.id === selectedRequestId
    )?.requestNumber;
    if (requestNumber) {
      currentPageTitle = `${pageTitles[page]} #${requestNumber.toLocaleString(
        'en-US',
        { useGrouping: false }
      )}`;
    }
  }

  const showHeader = !['print-report'].includes(page);
  const showNewRequestButton = ![
    'new-request',
    'settings',
    'fill-request',
    'print-report',
  ].includes(page);

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <Header title={currentPageTitle}>
            {authUser?.permissions.canCreateRequests && showNewRequestButton && (
              <button
                onClick={() => setPage('new-request')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Icon name="add" className="w-5 h-5 me-2" />
                إنشاء طلب جديد
              </button>
            )}
          </Header>
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="animate-fade-in">{renderPage()}</div>
        </main>
      </div>
      <NotificationContainer />
      {confirmModal.isOpen && confirmModal.options && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={hideConfirmModal}
          onConfirm={confirmModal.options.onConfirm}
          title={confirmModal.options.title}
        >
          {confirmModal.options.message}
        </ConfirmModal>
      )}
    </div>
  );
};

export default App;
