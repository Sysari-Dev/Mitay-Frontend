import { RestaurantPageLayout } from '@/modules/restaurant/presentation/shared/components/RestaurantPageLayout'

export default function RestaurantLayout({ children }: LayoutProps<'/restaurant'>) {
  return <RestaurantPageLayout>{children}</RestaurantPageLayout>
}
