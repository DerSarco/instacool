import * as React from 'react';
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps, WrappedFieldInputProps } from 'redux-form';

const style = {
  file: {
    display: 'none'
  },
  img: {
    borderRadius: '100%',
    height: '100px',
    width: '100px',
  }
}

interface IProfileImg {
  submitProfileImg: () => void,
  profileImage: string
}
const handleChange = (submitProfileImg: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const { onChange } = input;
  const { files } = e.target
  if (files) {
    await onChange(files[0]);
    submitProfileImg();
  }
}
const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({ input, submitProfileImg, profileImage }) =>
  <div>
    <input onChange={handleChange(submitProfileImg, input)} style={style.file} type="file" id='profileImage' />
    <label htmlFor="profileImage">
      <img style={style.img} src={profileImage} />
    </label>
  </div>


class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
  public render() {
    const { handleSubmit, submitProfileImg, profileImage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='profileImg'
          profileImage={profileImage}
          component={RenderField}
          submitProfileImg={submitProfileImg} />
      </form>
    )
  }
}

export default reduxForm<any, IProfileImg>({
  form: 'profileImg'
})(ProfileImg)