export const ShowHideMessage = (usestate, value) => {
  setTimeout(() => {
      usestate(value)
    }, 5000);
}

