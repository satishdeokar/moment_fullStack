import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpService } from 'src/app/core/http-services/http.service';
import { ApiUrls } from 'src/app/config/api-urls.enum';
@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.scss']
})
export class MomentListComponent implements OnInit {

  momentList: any;
  tableData: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource;

  @ViewChild('search') search: ElementRef<HTMLInputElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['title', 'comment', 'photoUrl', 'tags', 'action'];

  total: number;
  recordPerPage: number;
  currentPage = 1;
  pageSizeOptions: string[];

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.httpService.get(ApiUrls.getMoments).subscribe((res: any) => {
      this.momentList = res['data'];
      console.log(this.momentList,'this.momentList',res)
      this.dataSource = new MatTableDataSource(this.momentList);
      this.total = this.momentList.totalMoments;
      setTimeout(()=>{ 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       }, 30);
    }, (err) => {
      console.log('err', err);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.recordPerPage = pageData.pageSize;
  }


  edit(moment, i?) {
    this.router.navigateByUrl(`dashboard/moments/create-moment/${moment._id}`);
  }
  delete(moment, i?) {
    this.httpService.secureDelete(`${ApiUrls.deleteMoment}?id=${moment._id}`).subscribe((res) => {
      console.log('res', res);
      if (res) {
        const itemIndex = this.momentList.findIndex(obj => obj['_id'] === moment['_id']);
        this.momentList.splice(itemIndex, 1);
        this.dataSource = new MatTableDataSource(this.momentList);
      }
    }, (err) => {
      console.log('err', err);
    });
  }
}

