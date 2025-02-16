import { Component, Input, OnInit } from '@angular/core';
import hljs from 'highlight.js'
import Quill from 'quill';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit {

  html = '';
  @Input() quillToolbar:any = [
    ['bold', 'italic', 'underline'],        // toggled buttons
    // ['blockquote', 'code-block'],

    //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    // [{ 'direction': 'rtl' }],                         // text direction
    // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    // [{ 'font': [] }],
    // [{ 'align': [] }],
    // ['clean'],                                        // remove formatting button
    ['link', 'image', 'video']                         // link and image, video
  ];
  
  constructor() { }

  tools:any = {}

  ngOnInit(): void {

    this.tools = {
      // imageResize: {},
      syntax: {
        highlight: text => hljs.highlightAuto(text).value
      },
      toolbar: this.quillToolbar
    }
  }

}
