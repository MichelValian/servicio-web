import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/react';
import { getSession } from 'next-auth/react';


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    //verificar que el usuario este autenticado
    // const session = await getSession({ request })
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    //extraer la ruta que se estaba visualizando
    const requestedPage = request.nextUrl.pathname; // /products

    if(!session){
      // return NextResponse.redirect(`${process.env.SERVER_NAME}/login?p=${encodeURIComponent(`${process.env.SERVER_NAME}${requestedPage}`)}`);
      return NextResponse.redirect(`${process.env.SERVER_NAME}/login`);
    }

    //si está autenticado, continuar con la petición
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/products/:path*',
    '/protected',
  ],
}


// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req, res) {
  
//   const secret = process.env.NEXTAUTH_SECRET
//   const token = await getToken({ req, secret })
//   const typeRol=token?.rol //el rol se obtiene de la cookie

//   console.log("El rol del usuario es:",typeRol)

//   // EL 1 ES PARA IDENTIFICAR ADMIN Y EL 0 PARA CLIENTES

//   //se protegen los archivos pertenecientes a cliente
//   if (req.nextUrl.pathname.startsWith('/cliente')) { //se indica cuando esté en esa ruta, si no se cumplen las condiciones dentro de aqui, se permitira el paso a esa ruta
//       if (typeRol == 1) {  //En caso que se detecte el rol de admin, se redirecionara a su respectiva ruta
//       return NextResponse.redirect(new URL('/admin', req.url));
//       }else if (typeRol === undefined || typeRol != 0){ //si no se detecta algun usuario con rol valido entonces se manda al login
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//   }
  
//   //se protegen los archivos pertenecientes a admin
//   if (req.nextUrl.pathname.startsWith('/admin')) {
//     if (typeRol == 0) { 
//     return NextResponse.redirect(new URL('/cliente', req.url));
//     }else if (typeRol === undefined || typeRol != 1){
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   //si el usuario se encuentra autenticado no podra ingresar al login
//   if (req.nextUrl.pathname.startsWith('/login')) {
//     if (typeRol == 0) { 
//     return NextResponse.redirect(new URL('/cliente', req.url));
//     }else if (typeRol == 1){
//       return NextResponse.redirect(new URL('/admin', req.url));
//     }
//   }

//   //si el usuario se encuentra autenticado no podra ingresar al register
//   if (req.nextUrl.pathname.startsWith('/register')) {
//     if (typeRol == 0) { 
//     return NextResponse.redirect(new URL('/cliente', req.url));
//     }else if (typeRol == 1){
//       return NextResponse.redirect(new URL('/admin', req.url));
//     }
//   }
// }