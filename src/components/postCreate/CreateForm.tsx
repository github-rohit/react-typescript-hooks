import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Buttons from './Buttons';

import { InputField } from '../../types/FormInputField';
import FormInputs from '../../common/form/FormInputs';
import fields from './Fields.json';
import schema from './Schema';
import { PostStatus } from '../post/Post';

export interface CreatePostData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: any;
  status: PostStatus;
}

export interface FromProps {
  defaultValues: CreatePostData;
  onSubmit: (formData: CreatePostData, event: any) => void;
}

const From: React.SFC<FromProps> = ({ defaultValues, onSubmit }) => {
  const {
    register,
    control,
    errors,
    setValue,
    handleSubmit,
    formState,
  } = useForm<CreatePostData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { isValid } = formState;

  function handelOnClickPublish(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setValue('status', 'published');
  }

  function handelOnClickDraft(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setValue('status', 'draft');
  }

  function handelKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  function handelKeyup(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter') event.preventDefault();
    const { currentTarget: el } = event;
    el.style.height = `0`;
    el.style.height = `${el.scrollHeight}px`;
  }

  (fields as InputField[])[0] = {
    ...fields[0],
    onKeyDown: handelKeyDown,
    onKeyUp: handelKeyup,
  } as InputField;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-9 ui-new-post pt-4">
            <FormInputs
              control={control}
              register={register}
              fields={[fields[0], fields[1]]}
              errors={errors}
            />
          </div>
          <div className="col-md-3">
            <div className="sub-field-container">
              <FormInputs
                register={register}
                fields={[...fields].slice(2)}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <Buttons
          onPublish={handelOnClickPublish}
          onDraft={handelOnClickDraft}
          disabled={!isValid}
        />
      </form>
    </>
  );
};

export default From;
