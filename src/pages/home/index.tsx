// HomePage.tsx
import React from 'react';
import {
  HomeBanner,
  FollowOA,
  QuickAction,
  HomeCategory,
  HomeProducts,
  HomeNews,
} from './components';
import { Modal } from 'zmp-ui';
import { usePopupBanner } from 'miniapp-core/src';
// import { useExample, log } from "miniapp-core";
import { useEffect } from 'react';

const HomePage: React.FunctionComponent = () => {
  const { bannerData, isPopupOpen, closePopup } = usePopupBanner();
  // const forceFetchCategories = useForceFetchCategories();
  // const forceFetchProducts = useForceFetchProducts();
  // const handleRefresh = async () => {
  //   try {
  //     await Promise.all([forceFetchCategories(), forceFetchProducts()]);
  //   } catch (error) {
  //     console.error('Refresh failed', error);
  //   }
  // };
  // const value = useExample();

  // useEffect(() => {
  //   log(`Hook returned: ${value}`);
  // }, []);

  // return (
  //   <div>
  //     value: {value}
  //   </div>
  // );

  return (
    // <PullToRefresh onRefresh={() => handleRefresh()}>
    <div className="min-h-full bg-section">
      <HomeBanner />
      <FollowOA />
      <QuickAction />
      <HomeCategory />
      <HomeNews />
      <HomeProducts />

      <Modal
        visible={isPopupOpen && bannerData !== null}
        coverSrc={bannerData?.image ?? ''}
        maskClosable={false}
        onClose={closePopup}
        actions={[{ text: 'Đóng', close: true, highLight: true }]}
        description={bannerData?.description ?? ''}
      />
    </div>
    // </PullToRefresh>
  );
};

export default HomePage;
