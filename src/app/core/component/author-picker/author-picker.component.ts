import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AuthorModel, AuthorManagementService, AuthorModelRequest, Author } from '../../author-management';
import { MatRadioChange } from '@angular/material/radio';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PrivilegeService } from 'src/app/authentication/_services/privilege.service';
import { AuthenticationService } from 'src/app/authentication/_services/authentication.service';

@Component({
  selector: 'pp-author-picker',
  templateUrl: './author-picker.component.html',
  styleUrls: ['./author-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthorPickerComponent implements OnInit {

  @Input() disabled = true;
  @Input() authors: AuthorModel[];
  @Output() updateAuthorEvent: EventEmitter<AuthorModel> = new EventEmitter<AuthorModel>();
  @Output() deleteAuthorEvent: EventEmitter<AuthorModel> = new EventEmitter<AuthorModel>();

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
    public p: PrivilegeService,
    public auth: AuthenticationService
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

  getSelectedAuthor(author: AuthorModel) {
    for (let a of this.authors) {
      if (a.userId === author.userId) {
        return a.authorRole;
      }
    }
    return '';
  }

  update(role: MatRadioChange, author: AuthorModel) {
    this.autoTrigger.closePanel();
    author.authorRole = role.value;
    this.updateAuthorEvent.next(author);
  }

  delete(author: AuthorModel) {
    this.autoTrigger.closePanel();
    this.deleteAuthorEvent.next(author);
  }
}
