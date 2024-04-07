import React from 'react';

type Props = {
  errors?: any[]
}

const ListErrors: React.FC<Props> = props => {
  const errors = props.errors;
  if (errors) {
    return (
      <ul className="error-messages">
        {errors.toString().replace(/"/g, '')}
        {/* {
          Object.keys(errors).map((key: any) => {
            return (
              <li key={key}>
                {errors[key]}
              </li>
            );
          })
        } */}
      </ul>
    );
  } else {
    return null;
  }
}

export default ListErrors;
