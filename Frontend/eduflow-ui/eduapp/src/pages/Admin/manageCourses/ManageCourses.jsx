
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
    BookOpen,
    Save 
} from 'lucide-react';
import {useSelector,useDispatch} from 'react-redux'
import { resetForm,setCoursesValues, toggleDeleteModal } from '../../../features/Admin/coursesManagementSlice';
import { saveCourses } from '../../../services/CoursesManagementService';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import DeleteCourseModal from './modals/DeleteCourseModal';
const ManageCourses = () => {
    const {course , isDeleteModalOpen}=useSelector((state)=>state.courseManagement);
    const dispatch=useDispatch();
    const codeRef = useRef();
    const navigte=useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
    const isInstructorField = ['PrimaryDoctor', 'Assistant1', 'Assistant2'].includes(name);
    const isScheduleField = ['Days', 'Lectures'].includes(name);
    let nestedLevel = 0;
    if (isInstructorField) nestedLevel = 1 
     else if (isScheduleField) nestedLevel = 2 
    dispatch(setCoursesValues({
        nested: nestedLevel, 
        value: { [name]: value }
    }));
};
const handleDayChange = (e) => {
    const { value, checked } = e.target;
    let currentDays = course.Schedule.Days ? course.Schedule.Days.split(', ') : [];

    if (checked) {
        currentDays.push(value); 
    } else {
        currentDays = currentDays.filter(day => day !== value); 
    }

    dispatch(setCoursesValues({
        nested: 2, 
        value: { Days: currentDays.join(', ') }
    }));
};

const handleClear=()=>{
    dispatch(resetForm());
    codeRef.current.focus();
}

const handleSave=async()=>{
    try {
        const result=await dispatch(saveCourses(course)).unwrap();
        const {saved,updated}=result;
        if(saved){
            toast.success("Data Saved Successfully",{
                theme:'colored'
            })
        }
        if(updated){
            toast.success("Data updated Successfully",{
                theme:'colored'
            })
        }
    } catch (error) { }
        
}

const handleDelete=()=>{
    if(course.Serial===0){
        toast.error("Course selection required before deletion!",{
            theme:'colored'
        })
        return;
    }
    dispatch(toggleDeleteModal(true));
}
useEffect(() => {
    if (codeRef.current) codeRef.current.focus();
}, []);
    return (
        <div className="subjects-mgmt-wrapper">
            {isDeleteModalOpen && <DeleteCourseModal/>}
            <div className="subjects-main-layout">
                
                <div className="subjects-sidebar-pro">
                    <div className="sidebar-top-icon">
                        <BookOpen size={24} color="#818cf8" />
                    </div>
                    <div className="sidebar-actions-group">
                        <button 
                        className="pro-side-btn btn-reset" 
                        title="Clear Form"
                        onClick={handleClear}
                        >
                            <RotateCcw size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-save" 
                        title="Save Subject"
                        onClick={handleSave}>
                            <Save  size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-delete" 
                        title="Delete Subject"
                        onClick={handleDelete}>
                            <Trash2 size={20} />
                        </button>
                        <button 
                        className="pro-side-btn btn-view" 
                        title="Search Subjects" 
                        onClick={()=>navigte('/previewcourses')}>
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
                                value={course.CourseCode || ""}
                                onChange={handleChange}
                                  />
                            </div>
                            <div className="sub-field-group">
                                <label>Course Name</label>
                                <input 
                                type="text"
                                name='CourseName'
                                value={course.CourseName || "" }
                                onChange={handleChange}
                                />
                            </div>
                            <div className="sub-field-group">
                                <label>Students Max No.</label>
                                <input 
                                type="number"
                                name='MaxStudents'
                                value={course.MaxStudents || 0}
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
                               <div className="days-flex-group">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
                            const daysString = course?.Schedule?.Days || "";
                            const selectedDaysArray = daysString
                                .split(',')
                                .map(d => d.trim());

                            const isChecked = selectedDaysArray.includes(day);

                            return (
                                <label key={day} className={`day-chip ${isChecked ? 'active' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        name="Days" 
                                        value={day} 
                                        checked={isChecked}
                                        onChange={handleDayChange} 
                                        hidden 
                                    />
                                    {day}
                                </label>
                            );
})}
                                </div>
                                <div className="slot-input-wrapper">
                                    <input 
                                    type="text"
                                    placeholder='Lectures'
                                    name='Lectures'
                                    value={course?.Schedule?.Lectures || ""}
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