export default function SignIn() {
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
