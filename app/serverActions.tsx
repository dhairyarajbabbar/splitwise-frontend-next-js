'use server'
require('dotenv').config();
import { cookies } from "next/headers";
// export const dynamic = 'force-dynamic'

export async function findParticipants(grpId: string) {
    console.log(grpId);
    const url = `https://splitwise-backend.vercel.app/api/group/${grpId}`;

    const cookieStore = cookies();
    const cook = cookieStore.get('accessToken');
    const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            cookie: `accessToken=${cook?.value}`,
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}
export async function addFriend(friendEmail: string) {
    const formdata = new URLSearchParams();
    formdata.append('friendemail', friendEmail);
    // const apiUrl = `http://localhost:4000/api/user/friend/`;
    const apiUrl = `https://splitwise-backend.vercel.app/api/user/friend/`;
    try {
        const cookieStore = cookies();
        const cook = cookieStore.get('accessToken');
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: `accessToken=${cook?.value}`,
            },
            credentials: 'include',
            method: 'POST',
            body: formdata,
        });

        console.log(response);
        return response.json();
    } catch (error) {
        console.error('Error adding friend:', error);
    }
    // router.refresh();
};

export const addGroup = async (groupName: string, members: { name: string, email: string }[]) => {
    const memberData = members.map((member) => member.email);
    // const apiUrl = `http://localhost:4000/api/group`;
    const apiUrl = `https://splitwise-backend.vercel.app/api/group`;
    const formData = new URLSearchParams();
    formData.append('name', groupName);
    memberData.forEach((email) => {
        formData.append('memberData', email);
    });
    
    try {
        const cookieStore = cookies();
        const cook = cookieStore.get('accessToken');
        console.log(cook);
        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-Type': 'application/x-www-form-urlencoded',
                Cookie: `accessToken=${cook?.value}`,
            },
            mode: 'cors',
            body: formData,
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error('Error creating group:', error);
    }
    // router.refresh();
};

export const addExpense = async (amount: string,description: string,groupId: string) => {
    const apiUrl = `https://splitwise-backend.vercel.app/api/groupexpense`;
    const formData = new URLSearchParams();
    formData.append('amount', amount);
    formData.append('description', description);
    formData.append('groupId', groupId || 'none');
  
    let participants = await findParticipants(groupId);
    participants = participants.group.members;
    let userList = participants.map((participant: any) => participant.user);
    let userListJSON = JSON.stringify(userList);
    formData.append('participants', userListJSON);
    try {
        const cookieStore = cookies();
        const cook = cookieStore.get('accessToken');
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-Type': 'application/x-www-form-urlencoded',
          Cookie: `accessToken=${cook?.value}`,
        },
        mode: 'cors',
        body: formData,
      });
    } catch (error) {
      console.error('Error creating group:', error);
    }
    // router.refresh();
  };