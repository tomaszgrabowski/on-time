import React from 'react';

interface IProps {
    data: number;
}

const DelayTimeInfo = ( props: IProps ) => {
    const delay = ( seconds: number ): string => {
        if ( seconds < 60 && seconds > -60 ) {
            return `${ seconds } sek`;
        }
        return `${ Math.floor( seconds / 60 ) } min`;
    };
    const mathSign = ( seconds: number ): string => {
        if ( Math.sign( seconds ) === 1 ) {
            return '+';
        }
        return '-';
    };
    return (
        <span>
            { mathSign( props.data ) } { delay( Math.abs( props.data ) ) }
        </span>
    );
};

export default DelayTimeInfo;
