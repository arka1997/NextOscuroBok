'use client' // Only if using Next.js 13+ and you want this component to be client-side
import React, { useState } from 'react';
import './modalWrapper.css';
import axios from 'axios';
import { getDates } from '@/app/Components/Dates';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation'
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
        <Modal.Title>Create Instagram Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePostSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">UserName</h2>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="userName"
              readOnly
              value={formData.userName}
              onChange={handlePostDetails}
              className="w-full h-20 p-4 border border-gray-200 rounded-md resize-none focus:outline-none focus:border-blue-400"
            />
            <div className="w-full flex justify-center items-center relative">
              {image ? (
                <img src={image as string} alt="Preview" className="w-full h-auto rounded-md" />
              ) : (
                <div className="bg-gray-100 w-full h-40 flex justify-center items-center text-gray-400 rounded-md">
                  <span className="text-xs">No image selected</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <textarea
              name="postText"
              placeholder="Write your caption here..."
              onChange={handlePostDetails}
              className="w-full h-20 p-4 border border-gray-200 rounded-md resize-none focus:outline-none focus:border-blue-400"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
              Create Post
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ModalWrapper;
