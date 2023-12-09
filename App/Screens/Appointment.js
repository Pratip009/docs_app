import { View, Text,FlatList } from 'react-native'
import React from 'react'
import PageHeader from '../Components/Shared/PageHeader'
import { useUser } from '@clerk/clerk-expo';
import { useState,useEffect } from 'react';
import GlobalApi from '../Services/GlobalApi';
import AppointmentCardItem from '../Components/Appointment/AppointmentCardItem';


export default function Appointment() {

  const {isLoaded,isSignedIn,user}=useUser();

  const [appointmentList,setAppointmentList]=useState([]);
  useEffect(()=>{
    if(user.firstName)
    {
      getUserAppointments();
    }
  },[user])
  const getUserAppointments=()=>{
    GlobalApi.getUserAppointments(user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      setAppointmentList(resp.data.data)
    })
  }
  return (
    <View style={{padding:20}}>
       <PageHeader title={'My Appointments'} backButton={false} />
       <FlatList
        data={appointmentList}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>(
          <AppointmentCardItem appointment={item} />
        )}
      />
    </View>
  )
}