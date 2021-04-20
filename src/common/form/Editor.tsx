/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/skins/lightgray/skin.min.css';
import { InputField } from '../../types/FormInputField';

const Editor: React.FC<InputField> = (props) => {
  const [state, setState] = useState<tinymce.Editor | null>(null);
  const { name, value } = props;

  useEffect(() => {
    tinymce.init({
      selector: `#${name}`,
      menubar: false,
      branding: false,
      autoresize_bottom_margin: 0,
      autoresize_min_height: 300,
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help autoresize',
      ],
      toolbar:
        'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent table | link image, media | forecolor backcolor | code',

      setup: (editor: tinymce.Editor) => {
        setState(editor);
        editor.on('keyup change', () => {
          props.onChange(editor.getContent());
        });
      },
    } as any);

    return () => {
      (tinymce as any).remove(state);
    };
  }, []);

  return (
    <textarea id={name} {...props}>
      {value}
    </textarea>
  );
};

export default Editor;
