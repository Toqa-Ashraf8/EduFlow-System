import React, { useEffect } from 'react';
import './CourseDirectory.css';
import { BookOpen, Search, ChevronLeft, ChevronRight, NotebookPen , Users, Calendar, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../../../services/CoursesManagementService';
import { editCourse, setCurrentCoursePage } from '../../../features/Admin/coursesManagementSlice';

const CourseDirectory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { courses, pagination ,course} = useSelector((state) => state.courseManagement);
  const { currentPage, pageSize, coursesCount } = pagination;
  
  const totalPages = Math.ceil((coursesCount || 0) / (pageSize || 1));

  const handlePageChange = (newPage) => {
    dispatch(setCurrentCoursePage(newPage));
  };

const handleEdit=(index)=>{
     dispatch(editCourse(index));
     navigate('/addcourses'); 
}

  useEffect(() => {
    dispatch(fetchCourses({ pageNumber: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  return (
    <div className="directory-wrapper">
      <div className="directory-card">
        <div className="directory-header">
          <div className="header-info">
            <h2>Courses Management</h2>
            <p>Manage academic curriculum and schedule</p>
          </div>
          <div className="header-search">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search courses" />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Course Details</th>
                <th>Capacity</th>
                <th>Academic Staff</th>
                <th>Timing</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course,index) => (
                <tr key={index}>
                  <td className="course-cell">
                    <div className="course-badge">{course.CourseCode}</div>
                    <div className="course-name-wrapper">
                      <span className="main-name">{course.CourseName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="capacity-box">
                      <Users size={16} className="icon-muted" />
                      <span className="count">{course.MaxStudents}</span>
                      <span className="label">Students</span>
                    </div>
                  </td>
                  <td>
                    <div className="staff-info">
                      <div className="doctor-name">Dr. {course.PrimaryDoctor}</div>
                      <div className="assistants-list">
                        {course.Assistant1 && <span>• {course.Assistant1}</span>}
                        {course.Assistant2 && <span> - {course.Assistant2}</span>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="schedule-info">
                      <div className="info-item">
                        <Calendar size={14} /> <span>{course.Days}</span>
                      </div>
                      <div className="info-item">
                        <Clock size={14} /> <span>{course.Lectures}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <button className="btn-manage" title="Manage Course" onClick={()=>handleEdit(index)}>
                      <NotebookPen  size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="directory-footer">
          <div className="results-count">
            Showing <b>{courses.length}</b> of <b>{coursesCount}</b> courses
          </div>
          <div className="pagination-ctrls">
            <button 
              className="pagi-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="page-indicator">Page {currentPage} / {totalPages}</span>
            <button 
              className="pagi-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDirectory;