/*
 * Copyright (c) 2018 University of Stuttgart.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache Software License 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 */

import Pattern from '../model/hal/pattern.model';

export class MarkdownEditorUtils {

  static standardMarkdownEditiorButtons = ['bold', 'italic', 'heading', '|', 'quote', 'unordered-list', 'ordered-list',
    '|', // Separator
    'link', 'image',
    '|',  // Separator
    'code']

  static helpButton = {
    name: 'guide',
    action: 'https://pattern-atlas-readthedocs.readthedocs.io/en/latest/user_guide/patterns/#pattern-creation',
    className: 'fa fa-question-circle',
  };

  // this method is based on the private function _replaceSelection(cm, active, startEnd, url)
  // of simpleMDE (see simplemde.debug.js) which our markdowneditor is based on
  static insertTextAtCursor(editor: any, textBeforeCursor, textAfterCursor): void {
    var cm = editor.codemirror;
    var stat = editor.getState(cm);
    var options = editor.options;
    var url = 'http://';
    if (options.promptURLs) {
      url = prompt(options.promptTexts.image);
      if (!url) {
        return;
      }
    }
    var text;
    var start = textBeforeCursor; // text to insert before cursor
    var end = textAfterCursor; // text to insert after cursor
    var startPoint = cm.getCursor('start');
    var endPoint = cm.getCursor('end');
    if (url) {
      end = end.replace('#url#', url);
    }
    if (stat.link) {
      text = cm.getLine(startPoint.line);
      start = text.slice(0, startPoint.ch);
      end = text.slice(startPoint.ch);
      cm.replaceRange(start + end, {
        line: startPoint.line,
        ch: 0
      });
    } else {
      text = cm.getSelection();
      cm.replaceSelection(start + text + end);

      startPoint.ch += start.length;
      if (startPoint !== endPoint) {
        endPoint.ch += start.length;
      }
    }
    cm.setSelection(startPoint, endPoint);
    cm.focus();
  }

  static getPatternHrefMarkdown(patternLanguageId: string, pattern: Pattern): string {
    const patternReferenceUrl = `pattern-languages/${patternLanguageId}/${pattern.id}`;
    return `[${pattern.name}](${patternReferenceUrl})`;
  }
}
