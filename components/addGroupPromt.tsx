// Import necessary modules and types
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { addGroup } from '../app/serverActions';
import { RootState } from '@/app/redux/store';

interface AddGroupPromtProps {
    onClickHandler: () => void;
}

const AddGroupPromt: React.FC<AddGroupPromtProps> = ({ onClickHandler }) => {
    const router = useRouter();
    const [groupName, setGroupName] = useState<string>('');
    const [members, setMembers] = useState<Array<{ name: string; email: string }>>([
        { name: '', email: '' },
        { name: '', email: '' },
    ]);

    const handleMemberChange = (index: number, field: 'name' | 'email', value: string) => {
        setMembers((prevMembers) =>
            prevMembers.map((member, i) => (i === index ? { ...member, [field]: value } : member))
        );
    };

    const addMember = () => {
        setMembers((prevMembers) => [...prevMembers, { name: '', email: '' }]);
    };

    const handleAddGroup = async () => {
        addGroup(groupName, members);
        onClickHandler();
    };

    const handleClose = () => {
        // Call the onClickHandler when the close button is clicked
        onClickHandler();
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const modalContent = document.querySelector('.modal-content');

            // Check if the click is outside the modal content
            if (modalContent && !modalContent.contains(event.target as Node)) {
                // Call the onClickHandler when clicked outside
                onClickHandler();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClickHandler]);


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="modal-overlay modal-content bg-gray-900 p-8 rounded-lg w-2/3 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 border-4 border-gray-950">
                <div className="bg-slate-950 flex justify-between items-center mb-4 border-solid border-2 border-gray-950 rounded-lg p-3">
                    <h2 className="text-2xl font-bold text-white">Create a group</h2>
                    <button
                        onClick={() => {
                            onClickHandler();
                        }}
                        className="text-3xl font-bold text-white border-none bg-slate-950"
                    >
                        ×
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="mb-4 p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
                />
                <h2 className="text-white mb-2">Group Members</h2>
                <div>
                    {members.map((member, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                className="mb-2 p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={member.email}
                                onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                className="p-3 border border-gray-950 rounded-md w-full bg-gray-800 text-white"
                            />
                        </div>
                    ))}
                </div>
                <button onClick={addMember} className="mb-4 px-4 py-2 bg-slate-950 border border-gray-700 text-white rounded-md">
                    Add Member
                </button>
                <button onClick={handleAddGroup} className="px-4 py-2 bg-slate-950 border border-gray-700 text-white rounded-md">
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddGroupPromt;
