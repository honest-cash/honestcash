
declare var toastr: {
  error: any;
  success: any;
  warning: any;
  info: any;
  options: any;
};

toastr.options.positionClass = "toast-bottom-right";

const eToastr = toastr;

export default eToastr;
