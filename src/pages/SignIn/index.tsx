import { useCallback, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';

import api from '@/services';
import { useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';

import moment from 'moment';

export default function SignIn() {
  const { setLoading } = useLoading();
  const history = useHistory();
  const signInFormSchema = yup.object().shape({
    name: yup.string().required('Este campo é obrigatório'),
    surname: yup.string().required('Este campo é obrigatório'),
    birthdate: yup.string().required('Este campo é obrigatório'),
    cpf: yup.string().required('Este campo é obrigatório'),
    rg: yup.string().required('Este campo é obrigatório'),
    email: yup.string().required('Este campo é obrigatório'),
    genderIdentity: yup.string().required('Este campo é obrigatório'),
    linkedinUrl: yup.string().optional(),
    breed: yup.string().required('Este campo é obrigatório'),
    stateOfBirth: yup.string().required('Este campo é obrigatório'),
    gender: yup.string().required('Este campo é obrigatório'),
    countryOfBirth: yup.string().required('Este campo é obrigatório'),
    phone1: yup.string().required('Este campo é obrigatório'),
    educationLevel: yup.string().required('Este campo é obrigatório'),
    peopleLiveInSameHouse: yup.string().optional(),
    didYouMeetProLider: yup.string().required('Este campo é obrigatório'),
    videoUrl: yup.string().required('Este campo é obrigatório'),
    occupation: yup.string().optional(),
    // educationData: yup.array().of(
    //   yup.object().shape({
    //     degree: yup.string().required('Este campo é obrigatório'),
    //     institution: yup.string().required('Este campo é obrigatório'),
    //     course: yup.string().required('Este campo é obrigatório'),
    //     state: yup.string().required('Este campo é obrigatório'),
    //     country: yup.string().required('Este campo é obrigatório'),
    //     initialDate: yup.string().optional(),
    //     endDate: yup.string().optional(),
    //     grantAndAwards: yup.string().optional(),
    //   }),
    // ),
    // workData: yup.array().of(
    //   yup.object().shape({
    //     country: yup.string().required('Este campo é obrigatório'),
    //     state: yup.string().required('Este campo é obrigatório'),
    //     city: yup.string().required('Este campo é obrigatório'),
    //     initialOffice: yup.string().required('Este campo é obrigatório'),
    //     endOffice: yup.string().required('Este campo é obrigatório'),
    //     initialDate: yup.string().optional(),
    //     endDate: yup.string().optional(),
    //     organization: yup.string().required('Este campo é obrigatório'),
    //     industryType: yup.string().optional(),
    //     activities: yup.string().required('Este campo é obrigatório'),
    //     coFounder: yup.number().required('Este campo é obrigatório'),
    //     compensationType: yup.string().optional(),
    //     managedByFamily: yup.number().required('Este campo é obrigatório'),
    //   }),
    // ),
    // star: yup.array().of(
    //   yup.object().shape({
    //     situation: yup.string().required('Este campo é obrigatório'),
    //     task: yup.string().required('Este campo é obrigatório'),
    //     action: yup.string().required('Este campo é obrigatório'),
    //     result: yup.string().required('Este campo é obrigatório'),
    //   }),
    // ),
  });

  // const { handleSubmit, control, trigger, watch } = useForm({
  //   mode: 'onSubmit',
  //   reValidateMode: 'onSubmit',
  //   resolver: yupResolver(validate ? signInFormSchema : saveForLaterSchema),
  // });

  // const handleGetAllCountries = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const countryResponse = await api.get('/countries');
  //     const stateResponse = await api.get('/states');
  //     setCountries(
  //       countryResponse.data.map((country: any) => ({
  //         value: country?.nome,
  //         label: country?.nome,
  //       })),
  //     );
  //     setStates(
  //       stateResponse.data.map((state: any) => ({
  //         value: state?.nome,
  //         label: state?.nome,
  //       })),
  //     );
  //     setLoading(false);
  //   } catch (e) {
  //     notification.error({
  //       message: 'Erro!',
  //       description:
  //         'Ops, houve um erro ao buscar os países ou estados, favor recarregar a página, se o erro persistir, entre em contato com o suporte',
  //       duration: 5,
  //     });
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [setLoading]);

  // useEffect(() => {
  //   handleGetAllCountries();
  // }, [handleGetAllCountries]);

  // const handleSignIn = async (values: FieldValues) => {
  //   try {
  //     setLoading(true);
  //     values.status = validate ? 'COMPLETE_SUBSCRIPTION' : 'INITIAL_SUBSCRIPTION';
  //     values.birthdate = moment(values.birthdate).format('YYYY-MM-DDTHH:mm:ss.SSS');
  //     values.educationData = values.educationData.map((item: any) => {
  //       return {
  //         initialDate: item?.initialDate
  //           ? moment(item?.initialDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
  //           : '',
  //         endDate: item?.endDate ? moment(item?.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS') : '',
  //       };
  //     });
  //     values.workData = values.workData.map((item: any) => {
  //       return {
  //         initialDate: item?.initialDate
  //           ? moment(item?.initialDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
  //           : '',
  //         endDate: item?.endDate ? moment(item?.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS') : '',
  //       };
  //     });
  //     await api.post('/subscriber', values);
  //     history.push(validate ? '/confirm' : '/pending-subscription');
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     notification.error({
  //       message: 'Opa! Houve um Erro!',
  //       description: error?.response?.data.message,
  //       duration: 5,
  //     });
  //     setLoading(false);
  //   }
  // };

  return (
    <></>
    // <Grid container spacing={2}>
    //   <Grid xs={6}>
    //     <Box display='flex' bgcolor='blue' width='100%'>
    //       asdasd
    //     </Box>
    //   </Grid>
    //   <Grid xs={6}>
    //     <Box bgcolor='blue' width='100%'>
    //       asdasd
    //     </Box>
    //   </Grid>
    // </Grid>
  );
}
