import React,{use, useState} from 'react'
import axios from 'axios'
import axiosInstance from '../../axiosInstance'
const Dashboard = () => {
    useState(() => {
        const fetchData = async () => {
            try{
                const response = await axiosInstance.get('protected-view/')
                console.log("Success:",response.data);
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard