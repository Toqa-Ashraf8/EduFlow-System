
import React, { useEffect, useRef } from 'react';
import './ManageCourses.css';
import { 
    Database, 
    RotateCcw, 
    Trash2, 
    Search, 
    LayoutGrid, 
    Clock, 
    UserCircle2,
    BookOpen
} from 'lucide-react';
import {useSelector,useDispatch} from 'react-redux'
import { setCoursesValues } from '../../../features/Admin/CoursesManagementSlice';
const ManageCourses = () => {
    const {course}=useSelector((state)=>state.courseManagement);
    const dispatch=useDispatch();
    const codeRef = useRef();

const handleChange=(e)=>{
    const{name,value}=e.target;
    dispatch(setCoursesValues({[name]:value}));
}


    useEffect(() => {
        if (codeRef.current) codeRef.current.focus();
    }, []);
console.log("course",course);
    return (
        <div className="subjects-mgmt-wrapper">
            <div className="subjects-main-layout">
                
                <div className="subjects-sidebar-pro">
                    <div className="sidebar-top-icon">
                        <BookOpen size={24} color="#818cf8" />
                    </div>
                    <div className="sidebar-actions-group">
                        <button 
                        className="pro-side-btn btn-reset" 
                        title="Clear Form">
                            <RotateCcw size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-save" 
                        title="Save Subject">
                            <Database size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-delete" 
                        title="Delete Subject">
                            <Trash2 size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-view" 
                        title="Search Subjects">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
                <div className="subjects-wide-card">
                    <div className="subjects-card-header">
                        <div className="header-title-set">
                            <LayoutGrid size={20} className="header-icon" />
                            <div className="header-main-text">Course Management Center</div>
                        </div>
                        <div className="header-sub-text">Configure academic module specifications and timings</div>
                    </div>

                    <div className="subjects-form-body">
                        <div className="sub-form-row">
                            <div className="sub-field-group">
                                <label>Serial</label>
                                <input 
                                type="text" 
                                ref={codeRef}
                                name='Serial'
                                value={course.Serial || 0}
                                disabled
                                />
                            </div>
                             <div className="sub-field-group">
                                <label>Course Code</label>
                                <input 
                                type="text" 
                                ref={codeRef}
                                name='CourseCode'
                                value={course.CourseCode || 0}
                                onChange={handleChange}
                                  />
                            </div>
                            <div className="sub-field-group">
                                <label>Course Name</label>
                                <input 
                                type="text"
                                name='CourseName'
                                value={course.CourseName || ""}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="sub-field-group">
                                <label>Students Max No.</label>
                                <input 
                                type="number"
                                name='StudentsNo'
                                value={course.StudentsNo || 0}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="instructors-panel-compact">
                            <div className="panel-label">
                                <UserCircle2 size={16} />
                                <span>Instructors Team</span>
                            </div>
                            <div className="sub-field-row wrap-logic">
                                <input 
                                type="text" 
                                className="ins-input" 
                                placeholder="Primary Doctor"
                                name='PrimaryDoctor'
                                value={course.Instructors.PrimaryDoctor || ""}
                                onChange={handleChange}
                                 />
                                <input 
                                type="text" 
                                className="ins-input" 
                                placeholder="Assistant 1"
                                name='Assistant1'
                                value={course.Instructors.Assistant1 || ""}
                                onChange={handleChange}
                                />
                                <input 
                                type="text" 
                                className="ins-input" 
                                placeholder="Assistant 2" 
                                name='Assistant2'
                                value={course.Instructors.Assistant2 || ""}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="schedule-panel-compact">
                            <div className="panel-label">
                                <Clock size={16} />
                                <span>Weekly Schedule Slots</span>
                            </div>
                            <div className="sub-field-row wrap-logic">
                                <div className="slot-input-wrapper">                             
                                    <input 
                                    type="text"
                                    placeholder='Days'
                                    name='Days'
                                    value={course.Schedule.Days || ""}
                                    onChange={handleChange}
                                     />
                                </div>
                                <div className="slot-input-wrapper">
                                    <input 
                                    type="text"
                                    placeholder='Lectures'
                                    name='Lectures'
                                    value={course.Schedule.Lectures || ""}
                                    onChange={handleChange}
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCourses;