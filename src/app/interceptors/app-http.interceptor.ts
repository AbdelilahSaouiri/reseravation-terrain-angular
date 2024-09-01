import { HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
 
  let authService=inject(AuthService)
  let token = localStorage.getItem("access-token");
  if (token)
  {
    let request = req.clone({
    setHeaders: {
      Authorization:"Bearer " + token
    }
  });
 return next(request).pipe(
  catchError(err => {
    if (err.status === 401) {
      Swal.fire({
        icon: 'info',
        timer: 1500,
        titleText: 'votre session a expiré, veuillez connecter de nouveau !',
        showConfirmButton:false
      })
      authService.logout();
    }
    return throwError(() => err);
  })
);
  }
  return next(req);
 
};
