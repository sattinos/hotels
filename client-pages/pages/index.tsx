import * as React from 'react';
import Head from 'next/head';
import LoadingIndicator from '../components/loadingIndicator';
import ModalDialogBox from '../components/modalDialogBox';
import Button from '../components/button';
import localizer from '../controller/lib/localization/localizer';
/*
const requests: any[] = [
  {
    count: 2,
    flatType: {
      name: 'Very long name',
      price: 100
    }
  },
  {
    count: 100,
    flatType: {
      name: 'Flat2',
      price: 25000
    }
  }
]

const userProfile: UserProfile = {
  fullName: 'Peter Swift',
  userName: 'davidBriteman',
  password: '456',
  filename: '123',
  phone: '0543202636',
  isVerified: false,
  id: 1,
  menus: [],
  token: ''
};
*/

export interface BasePageProps extends React.Props<BasePageProps> {
  isBusy?: boolean;
  message?: string;
  onOkClicked?: () => void;
}

const onClick = (props: BasePageProps) => {
  if (props.onOkClicked) {
    props.onOkClicked();
  }
}

const BasePage: React.FunctionComponent<BasePageProps> = (props: BasePageProps) => {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/react-day-picker/lib/style.css" />
      </Head>
      {props.children}
      <LoadingIndicator isLoading={props.isBusy || false} />
      <ModalDialogBox isVisible={props.message ? props.message.length > 0 : false} >
        <div className='modalDialogMessageDiv center'>{props.message}</div>
        <div className='btnDiv center'>
          <Button enabled={true} text={localizer.text('common.ok')} onClick={() => onClick(props)} />
        </div>
      </ModalDialogBox>
      <style jsx>{`
            .center {
              text-align: center;
            }
            .modalDialogMessageDiv {
              padding: 20px;              
            }
        `}
      </style>
      <style jsx global>{`
        @font-face {
          font-family: avenir;
          src: url(/static/fonts/Avenir.ttc), 'Arial Narrow Bold';
        }

        @font-face {
          font-family: din;
          src: url(/static/fonts/DIN NEXT_ ARABIC REGULAR.otf);
        }

        @font-face {
          font-family: fixedar;
          src: url(/static/fonts/fixedar.ttf);
        }

        html, body {
          height: 100%;
          box-sizing: border-box;
          margin: 0 auto;
          color: #000AFF;
          font-family: fixedar;
          max-width: 1270px;
        }

        input {
          box-sizing: border-box;
          outline: none;
        }

        button {
          font-family: fixedar;
          border-style: none;
        }

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
          font-family: fixedar;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          font-family: fixedar;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
          font-family: fixedar;
        }

        @media print { 
          .noPrint { 
            display: none !important; 
          }
        }
    `}</style>
    </div>
  )
}

export default BasePage;
