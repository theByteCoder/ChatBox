import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

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
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Toast showSnack={showSnack} text={text} variant={variant} />
        </SnackbarProvider>
      )}
    </>
  );
};

export default Toastbar;
