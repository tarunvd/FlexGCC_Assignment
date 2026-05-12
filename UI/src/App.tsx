import './App.css'
import { MainLayout } from './layouts/MainLayout'
import { WorkRequests } from './pages/WorkRequests'
import { CreateWorkRequest } from './pages/CreateWorkRequest'
import { WorkRequestDetails } from './pages/WorkRequestDetails'
import { Routes, Route } from 'react-router'
import { Slide, ToastContainer } from 'react-toastify';

function App() {
  return (
    <MainLayout>
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
        closeButton={true}
      />
      <Routes>
        <Route path="/" element={<WorkRequests />} />
        <Route path="/CreateWorkRequest" element={<CreateWorkRequest />} />
        <Route path="/WorkRequest/:workRequestId" element={<WorkRequestDetails />} />
      </Routes>
    </MainLayout>
  )
}

export default App
