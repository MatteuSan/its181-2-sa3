import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('authToken');
  const authReq = authToken
    ? req.clone({
      setHeaders: {
        Authorization: `Basic ${authToken}`,
      },
    })
    : req;
  return next(authReq);
};

