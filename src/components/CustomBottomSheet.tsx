import React, {useCallback} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {CustomBottomSheetProps} from '../utils/types';

const CustomBottomSheet = ({children, sheetRef}: CustomBottomSheetProps) => {
  // For rendering backdrop of modal
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    [],
  );
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={['10%', '90%']}
      onAnimate={(fromIndex, toIndex) => {
        if (toIndex === 0) {
          sheetRef?.current?.close();
        }
      }}
      containerStyle={{flex: 1}}
      backgroundStyle={[
        {
          backgroundColor: '#FFF',
        },
      ]}
      backdropComponent={renderBackdrop}>
      {children}
    </BottomSheet>
  );
};
export default CustomBottomSheet;
