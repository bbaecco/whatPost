module.exports = {
  successData: (status, message, data) => {
    return {
      status: status,
      success: true,
      message: message,
      data: data
    };
  },

  success: (status, message) => {
    return {
      status: status,
      success: true,
      message: message

    };
  },

  fail: (status, message) => {
    return {
      status: status,
      success: false,
      message: message
    };
  }
};