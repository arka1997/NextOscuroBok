'use client'; // Only if using Next.js 13+ and you want this component to be client-side
import React, { useState } from 'react';
import './modalWrapper.css';
import axios from 'axios';
import { getDates } from '@/app/Components/Dates';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

interface ModalWrapperProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ showModal, handleCloseModal }) => {
  const router = useRouter();

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    postText: '',
    userName: 'Deba',
    postLikes: 0,
    timestamp: getDates(),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (!selectedImage) return; // Add this check
    const reader = new FileReader();
    reader.onloadend = () => {
      setPostImage(selectedImage);
      setImage(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handlePostDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (postImage) {
        formDataToSend.append('postImage', postImage);
      }
      formDataToSend.append('postText', formData.postText);
      formDataToSend.append('userName', formData.userName);
      formDataToSend.append('postLikes', formData.postLikes.toString());
      formDataToSend.append('timestamp', formData.timestamp);

      const response = await axios.post('/api/addPost', formDataToSend);
      console.log("Post created successfully!", response.data);
      router.push('/postModal');
    } catch (error: any) {
      console.error('Failed to send post:', error.message);
    } finally {
      setPostImage(null);
      setFormData({
        postText: '',
        userName: 'Deba',
        postLikes: 0,
        timestamp: getDates(),
      });
      handleCloseModal();
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-heading">Create Instagram Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePostSubmit} className="form-wrapper">
          <h2 className="form-heading">UserName</h2>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="userName"
              readOnly
              value={formData.userName}
              onChange={handlePostDetails}
              className="input-field"
            />
            <div className="file-input-container">
              {image ? (
                <img src={image as string} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <span>No image selected</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
            <textarea
              name="postText"
              placeholder="Write your caption here..."
              onChange={handlePostDetails}
              className="textarea-field"
            />
            <button className="submit-button">
              Create Post
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWrapper;
