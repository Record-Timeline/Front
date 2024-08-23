/** @jsxImportSource @emotion/react */

import * as React from 'react';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from '@mui/material';
import {css} from "@emotion/react";
import AddIcon from '@mui/icons-material/Add';
import NoneData from "../career/NoneData";
import Career from '../career/Career';
import Education from '../career/Education';
import Certificate from "../career/Certificate";
import Language from "../career/Language";
import CareerInput from "../career/CareerInput";
import EducationInput from "../career/EducationInput";
import CertificateInput from "../career/CertificateInput";
import LanguageInput from "../career/LanguageInput";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export default function CareerModal({memberId}) {
  const [open, setOpen] = useState(false);
  // 조회한 경력사항 정보 저장
  const [careerInfo, setCareerInfo] = useState({});
  // 각 항목들을 관리할 상태 생성
  const [careers, setCareers] = useState([]);
  const [educations, setEducations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 새 경력 입력 항목 추가하는 함수 (input창 띄우는 함수)
  const addCareerInput = () => {
    setCareers([...careers, {type: "input", data: {}}]);
  };
  // 새 학력 입력 항목 추가하는 함수
  const addEducationInput = () => {
    setEducations([...educations, {type: "input", data: {}}]);
  };
  // 새 자격증 입력 항목 추가하는 함수
  const addCertificateInput = () => {
    setCertificates([...certificates, {type: "input", data: {}}]);
  };
  // 새 외국어 입력 항목 추가하는 함수
  const addLanguageInput = () => {
    setLanguages([...languages, {type: "input", data: {}}]);
  };

  // 경력 항목을 저장하는 함수
  const saveCareer = (index, data) => {
    const newCareers = careers.slice();
    newCareers[index] = {type: "item", data: data};
    setCareers(newCareers);
  };
  // 학력 항목을 저장하는 함수
  const saveEducation = (index, data) => {
    const newEducations = educations.slice();
    newEducations[index] = {type: "item", data: data};
    setEducations(newEducations);
  };
  // 자격증 항목을 저장하는 함수
  const saveCertificate = (index, data) => {
    const newCertificates = certificates.slice();
    newCertificates[index] = {type: "item", data: data};
    setCertificates(newCertificates);
  };
  // 외국어 항목을 저장하는 함수
  const saveLanguage = (index, data) => {
    const newLanguages = languages.slice();
    newLanguages[index] = {type: "item", data: data};
    setLanguages(newLanguages);
  };

  // 경력 항목을 수정 모드로 전환하는 함수
  const editCareer = (index) => {
    const newCareers = careers.slice();
    newCareers[index] = {...newCareers[index], type: "input"};
    setCareers(newCareers);
  };
  // 학력 항목을 수정 모드로 전환하는 함수
  const editEducation = (index) => {
    const newEducations = educations.slice();
    newEducations[index] = {...newEducations[index], type: "input"};
    setEducations(newEducations);
  };
  // 자격증 항목을 수정 모드로 전환하는 함수
  const editCertificate = (index) => {
    const newCertificates = certificates.slice();
    newCertificates[index] = {...newCertificates[index], type: "input"};
    setCertificates(newCertificates);
  };
  // 외국어 항목을 수정 모드로 전환하는 함수
  const editLanguage = (index) => {
    const newLanguages = languages.slice();
    newLanguages[index] = {...newLanguages[index], type: "input"};
    setLanguages(newLanguages);
  };

  // 아래부터 연동 코드, 위에는 프론트에서만 의미있는 함수들
  // 조회 연동
  const fetchCareerInfo = async (memberId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/career-details/${memberId}`);
      console.log("경력사항 조회 성공")
      console.log(response.data.result);
      setCareerInfo(response.data.result);
      setCertificates(response.data.result.certificates.map(item => ({type: "item", data: item})));
      setCareers(response.data.result.careers.map(item => ({type: "item", data: item})));
      setEducations(response.data.result.educations.map(item => ({type: "item", data: item})));
      setLanguages(response.data.result.languages.map(item => ({type: "item", data: item})));
    } catch (error) {
      console.log("경력사항 조회 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    fetchCareerInfo(memberId);
  }, [])

  // 경력 생성
  const createCareer = async (data) => {
    // 경력 생성 연동 (POST, CREATE)
    try {
      const response = await axiosInstance.post(
        `/api/v1/careers`,
        {
          companyName: data.companyName,
          startDate: data.startDate,
          endDate: data.endDate,
          duty: data.duty,
          position: data.position,
        }
      );
      // 이전에 사용했던 빈 input 항목을 현재 추가된 항목으로 교체
      const newCareers = careers.slice();
      const lastIndex = newCareers.length - 1;

      // 가장 최근에 추가된 항목(input타입)을 item 타입으로 교체
      newCareers[lastIndex] = {type: "item", data: response.data.result};
      
      console.log("경력 생성 완료", response)
      console.log(careers)
      
      // 생성 후 경력사항 다시 조회
      fetchCareerInfo(memberId)
      console.log(careers)
    } catch (error) {
      console.log("경력 생성 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  // 학력 생성
  const createEducation = async (data) => {
    // 학력 생성 연동 (POST, CREATE)
    try {
      const response = await axiosInstance.post(
        `/api/v1/educations`,
        {
          degree: data.degree,
          institution: data.institution,
          major: data.major,
          startDate: data.startDate,
          endDate: data.endDate,
        }
      );
      // 이전에 사용했던 빈 input 항목을 현재 추가된 항목으로 교체
      const newEducations = educations.slice();
      const lastIndex = newEducations.length - 1;

      // 가장 최근에 추가된 항목(input타입)을 item 타입으로 교체
      newEducations[lastIndex] = {type: "item", data: response.data.result};
      
      setEducations(newEducations);
      console.log("학력 생성 완료", response)
      console.log(educations)
    } catch (error) {
      console.log("학력 생성 실패", error);
      console.error("에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  // 자격증 생성
  const createCertification = async (data) => {
    // 자격 생성 연동 (POST, CREATE)
    setCertificates([...certificates, {type: "item", data: {}}]); //response.data
  };
  // 외국어 생성
  const createLanguage = async (data) => {
    // 외국어 생성 연동 (POST, CREATE)
    setLanguages([...languages, {type: "item", data: {}}]); //response.data
  };

  // 경력 항목을 삭제하는 함수 + 삭제 연동
  const deleteCareer = async (index) => {
    const careerId = careers[index].data.id;
    // 연동코드
    try {
      const response = await axiosInstance.delete(`/api/v1/careers/${careerId}`);
      setCareers(careers.filter((_, index) => index !== index));
      console.log("경력 삭제 완료", response.data)
      console.log(careers)

      // 삭제 후 경력사항 다시 조회
      fetchCareerInfo(memberId)
      console.log(careers)
    } catch (error) {
      console.log("삭제 에러 발생:", error);
      console.error("삭제 에러 상세:", error.response ? error.response.data : error.message);
    }
  };

  // 학력 항목을 삭제하는 함수 + 삭제 연동
  const deleteEducation = async (index) => {
    const educationId = educations[index].data.id;
    // 연동코드
    try {
      const response = await axiosInstance.delete(`/api/v1/educations/${educationId}`);
      setEducations(educations.filter((_, index) => index !== index));
      console.log("학력 삭제 완료", response.data)
      console.log(educations)

      // 삭제 후 경력사항 다시 조회
      fetchCareerInfo(memberId)
      console.log(educations)
    } catch (error) {
      console.log("삭제 에러 발생:", error);
      console.error("삭제 에러 상세:", error.response ? error.response.data : error.message);
    }
  };
  // 자격증 항목을 삭제하는 함수
  const deleteCertificate = async (index) => {
    const certificateId = certificates[index].data.id;
    // 연동코드
    setCertificates(certificates.filter((_, i) => i !== index));
  };
  // 외국어 항목을 삭제하는 함수
  const deleteLanguage = async (index) => {
    const languageId = languages[index].data.id;
    // 연동코드
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          borderRadius: '30px', // 둥근 모서리 반경 설정
          border: "2px solid #829FD7",
          '&:hover': {
            border: "2px solid #829FD7",
          }
        }}
        variant="outlined" // 이거 없애면 padding이 없어짐
        onClick={handleClickOpen}>
        내 경력 사항 수정
      </Button>
      <Dialog
        maxWidth={false}
        sx={{
          '& .MuiPaper-root': { // Dialog의 내부 Paper 컴포넌트에 스타일 적용
            width: '650px', // 모달 창의 너비를 설정
            borderRadius: '25px', // 둥근 모서리 반경 설정
            padding: '20px',
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>경력사항</h3>
        </DialogTitle>
        <DialogContent>
          <div
            css={css({
              margin: "0 10px",
              // border: "2px solid #829FD7",
            })}
          >
            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>경력</h2>
              <IconButton onClick={addCareerInput} aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            {careers.length === 0 ? (
              <NoneData
                messege={"아직 입력된 경력이 없습니다."}
              />
            ) : (
              careers.map((item, index) =>
                item.type === "item" ? (
                  <Career
                    companyName={item.data.companyName}
                    startDate={item.data.startDate}
                    endDate={item.data.endDate}
                    duty={item.data.duty}
                    position={item.data.position}
                    onEdit={() => editCareer(index)}
                  />
                ) : (
                  <CareerInput
                    createCareer={createCareer} // 생성 연동
                    // updateCareer={updateCareer} // 수정 연동
                    index={index}
                    saveItem={saveCareer}
                    initialData={item.data}
                    onDelete={() => deleteCareer(index)}
                  />
                )
              )
            )}

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>학력</h2>
              <IconButton onClick={addEducationInput} aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            {educations.length === 0 ? (
              <NoneData
                messege={"아직 입력된 학력이 없습니다."}
              />
            ) : (
              educations.map((item, index) =>
                item.type === "item" ? (
                  <Education
                    degree={item.data.degree}
                    startDate={item.data.startDate}
                    endDate={item.data.endDate}
                    institution={item.data.institution}
                    major={item.data.major}
                    onEdit={() => editEducation(index)}
                  />
                ) : (
                  <EducationInput
                    createEducation={createEducation} // 생성 연동
                    // updateEducation={updateEducation} // 수정 연동
                    index={index}
                    saveItem={saveEducation}
                    initialData={item.data}
                    onDelete={() => deleteEducation(index)}
                  />
                )
              )
            )}

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>자격증</h2>
              <IconButton onClick={addCertificateInput} aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            {certificates.length === 0 ? (
              <NoneData
                messege={"아직 입력된 자격증 없습니다."}
              />
            ) : (
              certificates.map((item, index) =>
                item.type === "item" ? (
                  <Certificate
                    certificateName={item.data.name}
                    date={item.data.date}
                    onEdit={() => editCertificate(index)}
                  />
                ) : (
                  <CertificateInput
                    createCareer={createCertification} // 생성 연동
                    // updateCareer={updateCertification} // 수정 연동
                    index={index}
                    saveItem={saveCertificate}
                    initialData={item.data}
                    onDelete={() => deleteCertificate(index)}
                  />
                )
              )
            )}

            <div css={css({display: "flex", alignItems: "center", gap: "1px",})}>
              <h2>외국어</h2>
              <IconButton onClick={addLanguageInput} aria-label="delete">
                <AddIcon/>
              </IconButton>
            </div>
            {languages.length === 0 ? (
              <NoneData
                messege={"아직 입력된 외국어가 없습니다."}
              />
            ) : (
              languages.map((item, index) =>
                item.type === "item" ? (
                  <Language
                    languageName={item.data.languageName}
                    proficiency={item.data.proficiency}
                    onEdit={() => editLanguage(index)}
                  />
                ) : (
                  <LanguageInput
                    createLanguage={createLanguage} // 생성 연동
                    // updateCareer={updateCareer} // 수정 연동
                    index={index}
                    saveItem={saveLanguage}
                    initialData={item.data}
                    onDelete={() => deleteLanguage(index)}
                  />
                )
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}