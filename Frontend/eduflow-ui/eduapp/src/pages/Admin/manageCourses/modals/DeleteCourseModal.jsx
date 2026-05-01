import React from 'react';
import './DeleteCourseModal.css';
import { Trash2, X } from 'lucide-react'; 
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, toggleDeleteModal } from '../../../../features/Admin/coursesManagementSlice';
import { deleteCourseAction } from '../../../../services/CoursesManagementService';
import { toast } from 'react-toastify';

const DeleteCourseModal = () => {

  const { course } = useSelector((state) => state.courseManagement);
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    try {
      const result = await dispatch(deleteCourseAction(course.Serial)).unwrap();
      if (result.deleted) {
        toast.error("Course has been removed successfully!", {
          theme: 'colored',
          position: 'top-right'
        });
        dispatch(toggleDeleteModal(false));
        dispatch(resetForm());
      }
    } catch (error) {dispatch(toggleDeleteModal(false))}
    
  };

  return (
    <div className="course-delete-overlay">
      <div className="course-delete-modal-card">
        <button 
          className="course-modal-close" 
          onClick={() => dispatch(toggleDeleteModal(false))}
        >
          <X size={20} />
        </button>
        
        <div className="course-delete-body">
          <div className="course-delete-icon-box">
            <Trash2 size={32} />
          </div>
          <h3>Delete Course</h3>
          <p>
            Are you sure you want to delete this Course? 
          </p>
        </div>

        <div className="course-delete-footer">
          <button className="course-btn course-btn-cancel" onClick={() => dispatch(toggleDeleteModal(false))}>
            Cancel
          </button>
          <button className="course-btn course-btn-danger" onClick={handleConfirmDelete}>
            Delete Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;