// frontend/src/utils/browserCheck.ts

export const checkPopupSupport = (): {
  supported: boolean;
  message?: string;
} => {
  // Check if popups are supported
  try {
    const testPopup = window.open('', '', 'width=1,height=1');

    if (!testPopup) {
      return {
        supported: false,
        message: 'Popups are blocked. Please enable popups for this site.',
      };
    }

    testPopup.close();
    return { supported: true };
  } catch (e) {
    return {
      supported: false,
      message: 'Your browser does not support popups.',
    };
  }
};
