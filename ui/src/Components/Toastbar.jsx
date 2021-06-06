import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

const Toast = ({ showSnack, text, variant }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    showSnack && enqueueSnackbar(text, { variant });
  }, [enqueueSnackbar, showSnack, text, variant]);

  return <></>;
};

const Toastbar = ({ showSnack, text, variant }) => {
  return (
    <>
      {showSnack && (
        <Toast showSnack={showSnack} text={text} variant={variant} />
      )}
    </>
  );
};

export default Toastbar;
