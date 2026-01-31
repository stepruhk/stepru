
import React from 'react';
import { Course } from '../types';

interface CourseSelectorProps {
  courses: Course[];
  onSelect: (course: Course) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, onSelect }) => {
  return (
    <div className="max-w-4xl w-full text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Bienvenue dans votre appli d'étudiant(e)s en communication</h1>
        <p className="text-xl text-slate-600">Veuillez sélectionner un cours pour accéder à vos ressources personnalisées.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelect(course)}
            className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 text-left overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full ${course.color} opacity-10 group-hover:scale-125 transition-transform duration-500`}></div>
            
            <div className={`inline-flex p-3 rounded-xl ${course.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <i className="fa-solid fa-book-open text-xl"></i>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{course.name}</h3>
            <p className="text-slate-500 leading-relaxed">{course.description}</p>
            
            <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
              Accéder au cours <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
