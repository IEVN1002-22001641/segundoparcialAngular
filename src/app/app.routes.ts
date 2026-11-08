import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formularios',
    children: [
      {
        path: 'usuario',
        loadComponent: () =>
          import('./formularios/usuario/usuario').then((c) => c.Usuario),
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formularios/zodiaco/zodiaco').then((c) => c.Zodiaco),
      }
    ],
  },
  {
    path: 'Escuela',
    children:[
      {
        path: 'lista-alumnos',
        loadComponent: () =>
          import('./Escuela/lista-alumnos/lista-alumnos').then((c) => c.ListaAlumnos),
      },
      {
        path: 'cinepolis',
        loadComponent: () =>
          import('./Escuela/cinepolis/cinepolis').then((c) => c.Cinepolis),
      },
      {
        path: 'ver-registros',
        loadComponent: () =>
          import('./Escuela/ver-registros/ver-registros').then((c) => c.VerRegistros),
      }
    ]
  },
  {
    path: 'utl', 
    children:[
      {
        path: 'alumnos',
        loadComponent:() =>
          import('./utl/alumnos/alumnos').then((c) => c.Alumnos),
      },
      {
        path: 'agregar',
        loadComponent:() =>
          import('./utl/agregar/agregar').then((c) => c.Agregar),
      },
      {
        path: 'editar/:matricula',
        loadComponent:() =>
          import('./utl/editar/editar').then((c) => c.Editar),
      },
      {
        path: 'eliminar/:matricula',
        loadComponent:() =>
          import('./utl/eliminar/eliminar').then((c) => c.Eliminar),
      },
      {
      path: 'maestros',
      loadComponent: () => import('./utl/maestros/maestros').then((c) => c.Maestros),
      },
      {
      path: 'maestros/agregar',
      loadComponent: () => import('./utl/maestros/agregar/agregar').then((c) => c.Agregar),
      },
      {
      path: 'maestros/editar/:idmaestro',
      loadComponent: () => import('./utl/maestros/editar/editar').then((c) => c.Editar),
      },
      {
      path: 'maestros/eliminar/:idmaestro',
      loadComponent: () => import('./utl/maestros/eliminar/eliminar').then((c) => c.Eliminar),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'admin',
  },
];