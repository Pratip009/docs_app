import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HospitalDoctorTab from '../Components/HospitalDoctorScreens/HospitalDoctorTab';
import HospitalListBig from '../Components/HospitalDoctorScreens/HospitalListBig';
import DoctorList from '../Components/HospitalDoctorScreens/DoctorList';
import GlobalApi from '../Services/GlobalApi';
import Colors from '../Shared/Colors';

export default function Explores() {

    const [hospitalList,setHospitalList]=useState([]);
  const [doctorsList,setDoctorsList]=useState([]);


  const [activeTab,setActiveTab]=useState('Hospital');

  useEffect(()=>{
    activeTab=='Hospital'?
    getAllHospital()
    :getAllDoctors();
  },[activeTab])

  const getAllHospital=()=>{
    GlobalApi.getAllHospital().then(resp=>{
      setHospitalList(resp.data.data);
    })
  }
  const getAllDoctors=()=>{
    GlobalApi.getAllDoctors().then(resp=>{
      console.log(resp.data.data);
      setDoctorsList(resp.data.data);
    })
  }
  return (
    <View style={{padding:20}}>
        <Text style={{
            fontSize:26,
            fontFamily:'appfontsemibold'
        }}>Explore</Text>

      <HospitalDoctorTab  
      activeTab={(value)=>setActiveTab(value)} />
        
        {!hospitalList?.length
      ?<ActivityIndicator size={'large'} 
      color={Colors.PRIMARY}
      style={{marginTop:'50%'}} />
      : 
      activeTab=='Hospital'?
      <HospitalListBig hospitalList={hospitalList} />
      :<DoctorList doctorsList={doctorsList} />
      }
    </View>
  )
}