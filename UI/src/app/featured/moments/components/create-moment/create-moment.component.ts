import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/http-services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrls } from 'src/app/config/api-urls.enum';
import { LocalStorageService } from 'src/app/core/data-services/local-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-create-moment',
  templateUrl: './create-moment.component.html',
  styleUrls: ['./create-moment.component.scss']
})
export class CreateMomentComponent implements OnInit {
  isloadding = false;
  createMomentForm: FormGroup;
  errorMessage = '';
  params: any;
  file: any;
  fileName;
  userDetails: any;
  userId = '';
  imgPath = '';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsList = [
    'Tag A' ,
  ];
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private localStorage: LocalStorageService,
    private activeRoute: ActivatedRoute
  ) {
    this.createMomentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      tags: [''],
      photoUrl: ['']
    });
    this.userDetails = this.localStorage.getLocalStorage('user');
    if (this.userDetails && this.userDetails.userId) {
      this.userId = this.userDetails.userId;
    }
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log('params', params)
      this.params = params;
      if (this.params) {
        const url = `${ApiUrls.getMoment}?id=${params.momentId}`;
        console.log(url, 'url')
        this.httpService.get(url).subscribe((res: any) => {
          console.log('res', res);
          const response = res['moment'];
          this.imgPath = response.photoUrl;
          const arr = response.photoUrl.split('/');
          delete response['photoUrl'];
          this.fileName = arr[arr.length - 1];
          console.log('response', response);
          this.createMomentForm.patchValue(response);


        }, (err) => {
          console.log('err', err);
        });
      }

    });
  }

  onSubmit(formValue) {
    this.isloadding = true;
    const payload = JSON.parse(JSON.stringify(formValue));
    payload['tags'] =this.tagsList;
    if (this.file) {
      this.uploadFile(payload);
    } else {
      payload['photoUrl'] = this.imgPath;
      this.saveForm(payload);
    }
  }
  onFileInput(e) {
    console.log('e', e.target.files[0]);
    this.file = e.target.files[0];
  }
  async uploadFile(payload) {
    let photoUrl = '';
    const fd = new FormData();
    fd.append('image', this.file);
    this.httpService.post(ApiUrls.uploadImage, fd).subscribe((res: any) => {
      console.log('res', res);
      photoUrl = res.url;
      payload.photoUrl = photoUrl;
      this.saveForm(payload);
    }, (err) => {
      console.log('err', err);
      this.saveForm(payload);
    });
  }
  saveForm(payload) {

    if (this.params.momentId) {
      payload['updatedBy'] = this.userId;
      this.httpService.securePut(`${ApiUrls.updateMoment}?id=${this.params.momentId}`, payload).subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('dashboard/moments/moment-list');
      }, (err) => {
      });
    } else {
      payload['createdBy'] = this.userId;
      console.log('formValue', payload);
      this.httpService.post(ApiUrls.createMoment, payload).subscribe((res) => {
        console.log('res', res);
        this.isloadding = false;
        this.router.navigateByUrl('dashboard/moments/moment-list');
      }, (err) => {
        console.log('err', err);
      });
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagsList.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
  }
}