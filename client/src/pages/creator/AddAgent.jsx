import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Quill from 'quill';
import uniqid from 'uniqid';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const AddAgent = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, getToken } = useContext(AppContext);

  const [agentName, setAgentName] = useState('');
  const [pricePerRun, setPricePerRun] = useState(0);
  const [image, setImage] = useState(null);
  const [modelType, setModelType] = useState('openai');
  const [promptTemplate, setPromptTemplate] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!image) {
        toast.error('Thumbnail Not Selected');
        return;
      }

      const agentData = {
        agentName,
        agentDescription: quillRef.current.root.innerHTML,
        pricePerRun: Number(pricePerRun),
        modelType,
        promptTemplate,
      };

      const formData = new FormData();
      formData.append('agentData', JSON.stringify(agentData));
      formData.append('image', image);

      const token = await getToken();

      const { data } = await axios.post(backendUrl + '/api/creator/add-agent', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setAgentName('');
        setPricePerRun(0);
        setImage(null);
        setModelType('openai');
        setPromptTemplate('');
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Agent Name</p>
          <input onChange={e => setAgentName(e.target.value)} value={agentName} type="text" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Agent Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Prompt Template</p>
          <textarea onChange={e => setPromptTemplate(e.target.value)} value={promptTemplate} placeholder='Prompt template here...' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Model Type</p>
          <select onChange={e => setModelType(e.target.value)} value={modelType} className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'>
            <option value="openai">OpenAI</option>
            <option value="huggingface">Hugging Face</option>
            <option value="webhook">Webhook</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Price per Run ($)</p>
          <input onChange={e => setPricePerRun(e.target.value)} value={pricePerRun} type="number" placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
        </div>

        <div className='flex md:flex-row flex-col items-center gap-3'>
          <p>Agent Thumbnail</p>
          <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
            <img src={assets.file_upload_icon} alt="Upload" className='p-3 bg-blue-500 rounded' />
            <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept="image/*" hidden />
            {image && <img className='max-h-10' src={URL.createObjectURL(image)} alt="Thumbnail Preview" />}
          </label>
        </div>

        <button type="submit" className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>
          ADD AGENT
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
