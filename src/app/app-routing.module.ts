import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFileComponent } from './components/send-file/send-file.component';

import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [
    {
      path: 'uploadFile',
      component: UploadFileComponent,

    },
    {
      path: 'sendFile',
      component: SendFileComponent,

    },
    {
      path: '',
      redirectTo: '/uploadFile',
      pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
