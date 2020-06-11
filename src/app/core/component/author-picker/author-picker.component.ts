import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AuthorModel, AuthorManagementService, AuthorModelRequest, Author } from '../../author-management';
import { MatRadioChange } from '@angular/material/radio';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';
import { Observable, of } from 'rxjs';
import { Privilege } from '../../user-management/_models/privilege.enum';

@Component({
  selector: 'pp-author-picker',
  templateUrl: './author-picker.component.html',
  styleUrls: ['./author-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorPickerComponent implements OnInit, OnChanges {

  @Input() authorEntity: any;
  @Input() context: number;
  @Input() disabled: boolean = true;
  @Input() authors: AuthorModel[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  authorCtrl = new FormControl();
  owner = 'OWNER';

  allAuthors: AuthorModel[];
  roles: string[];

  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

  constructor(
    private authorService: AuthorManagementService,
    private p: PrivilegeService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authorService.getAllAuthorRoles().subscribe(result => {
      this.roles = result
    })
    this.authorService.getAllAuthors().subscribe(result => {
      this.allAuthors = result
    })
    this.auth.user.subscribe(_user => {
      if (_user && !this.authors) this.authors = [new AuthorModel(_user.id, Author.OWNER, _user.name)];
    })
  }

  isChecked(author: AuthorModel) {
    for (let a of this.authors) {
      if (a.userId === author.userId) {
        return a.authorRole;
      }
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges) {
    // EDIT
    if (!changes.disabled.currentValue) {
      this.auth.user.subscribe(_user => {
        if (_user && this.authors) {
          for (let a of this.authors) {

            if (
              // USER AUTHOR
              a.userId === _user.id && (a.authorRole === Author.OWNER || a.authorRole === Author.MAINTAINER)) {
              this.disabled = false;
              return;
            }
          }
        }
        this.disabled = true;
      });
    }
  }

  submit(role: MatRadioChange, author: AuthorModel) {
    console.log(author, this.authors);
    for (let a of this.authors) {
      if (a.userId === author.userId) {
        this.update(role, author);
        return;
      }
    }
    this.create(role, author);
  }

  create(role: MatRadioChange, author: AuthorModel) {
    console.log(role.value, author);
    this.autoTrigger.closePanel();
    switch (this.context) {
      case 0: {
        this.authorService.createAuthorsIssue(author, this.authorEntity, new AuthorModelRequest(role.value)).subscribe(result => {
          console.log('create', result);
          if (result) this.authors.push(result);
        });
        break;
      }
      case 1: {
        this.authorService.createAuthorsCandidate(author, this.authorEntity, new AuthorModelRequest(role.value)).subscribe(result => {
          if (result) this.authors.push(result);
        });
        break;
      }
      default: {
        console.log('Pattern comment');
        break;
      }
    }
  }

  updateLocal(role: string, author: AuthorModel) {
    for (let a of this.authors) {
      if (a.userId === author.userId) {
        a.authorRole = role
        break;
      }
    }
  }

  update(role: MatRadioChange, author: AuthorModel) {
    this.autoTrigger.closePanel();
    switch (this.context) {
      case 0: {
        this.authorService.createAuthorsIssue(author, this.authorEntity, new AuthorModelRequest(role.value)).subscribe(result => {
          console.log('update', result);
          if (result) this.updateLocal(result.authorRole, author)
        });
        break;
      }
      case 1: {
        this.authorService.createAuthorsCandidate(author, this.authorEntity, new AuthorModelRequest(role.value)).subscribe(result => {
          if (result) this.updateLocal(result.authorRole, author)
        });
        break;
      }
      default: {
        console.log('Pattern comment');
        break;
      }
    }
  }

  deleteLocal(author: AuthorModel) {
    const index = this.authors.indexOf(author);
    if (index >= 0) this.authors.splice(index, 1);
  }

  delete(author: AuthorModel) {
    this.autoTrigger.closePanel();
    switch (this.context) {
      case 0: {
        this.authorService.deleteAuthorIssue(author, this.authorEntity).subscribe(result => {
          console.log('result');
          this.deleteLocal(author);
        });
        break;
      }
      case 1: {
        this.authorService.deleteAuthorCandidate(author, this.authorEntity).subscribe(result => {
          if (result) this.authors.push(result);
        });
        break;
      }
      default: {
        console.log('Pattern comment');
        break;
      }
    }
  }


}
