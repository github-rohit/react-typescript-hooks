import React from 'react';
import { Send } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

function NewPostButtons({ onPublish, onDraft, disabled }: any) {
  return (
    <>
      <div className="fixed-wrapper-btns create-btns clearfix">
        <div className="container">
          <Button
            disabled={disabled}
            onClick={onPublish}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Send />}
          >
            Publish
          </Button>
          &nbsp; &nbsp;
          <Button
            onClick={onDraft}
            disabled={disabled}
            type="submit"
            color="primary"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </>
  );
}

export default NewPostButtons;
