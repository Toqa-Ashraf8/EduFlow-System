import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    /*  if (allowedRoles && !allowedRoles.includes(userDetails.Role)) { 
        return <Navigate to="/home" replace />;
    }  */
    return children;
};

export default ProtectedRoute;