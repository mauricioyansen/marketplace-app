// import { useUserStore } from "../../../shared/store/user-store";
import { HomeView } from "../../../viewModels/Home/Home.view";
import { useHomeViewModel } from "../../../viewModels/Home/useHome.viewModel";

export default function Home() {
  const viewModel = useHomeViewModel();
  // const { logout } = useUserStore();
  // logout();

  return <HomeView {...viewModel} />;
}
