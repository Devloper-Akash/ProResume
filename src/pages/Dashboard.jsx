import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Edit, Trash2, Plus, FolderOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { supabase } from '../utils/supabase';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const { loadResumeData } = useResume();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchResumes = async () => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setResumes(data || []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, navigate]);

  const handleOpenResume = (resumeData) => {
    loadResumeData(resumeData);
    navigate('/builder');
  };

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this resume?')) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setResumes(resumes.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="dashboard-wrapper">
        {/* Decorative background elements using inline styles */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', top: '-128px', right: '25%', height: '288px', width: '288px', borderRadius: '50%', backgroundColor: 'rgba(79, 70, 229, 0.05)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '25%', height: '288px', width: '288px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.05)', filter: 'blur(40px)' }} />
        </div>

        <div className="container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="dashboard-title-area">
              <h1>My Dashboard</h1>
              <p>Manage and edit your saved resumes</p>
            </div>
            <button
              onClick={() => navigate('/builder')}
              className="btn btn-primary"
            >
              <Plus size={16} />
              Create New Resume
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="loader-container">
              <Loader2 size={32} className="loader-spinner" />
              <span style={{ fontWeight: 500 }}>Loading your resumes...</span>
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="empty-state"
            >
              <div className="empty-state-icon">
                <FolderOpen size={32} />
              </div>
              <h3>No resumes found</h3>
              <p>
                You haven't saved any resumes to your dashboard yet. Start building your first one!
              </p>
              <button
                onClick={() => navigate('/builder')}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Create Your First Resume
              </button>
            </motion.div>
          ) : (
            <div className="resumes-grid">
              {resumes.map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleOpenResume(resume.resume_data)}
                  className="resume-card"
                >
                  <div className="resume-card-header">
                    <div className="resume-icon-box">
                      <FileText size={20} />
                    </div>
                    <button
                      onClick={(e) => handleDeleteResume(resume.id, e)}
                      className="btn-delete-card"
                      title="Delete Resume"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="resume-card-body">
                    <h3>{resume.resume_name}</h3>
                    <div className="resume-card-date">
                      <Calendar size={12} />
                      <span>{formatDate(resume.updated_at)}</span>
                    </div>
                  </div>

                  <div className="resume-card-footer">
                    <button className="resume-card-open-btn">
                      <Edit size={13} />
                      Open to Download / Edit
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
