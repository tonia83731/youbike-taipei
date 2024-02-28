import BackStageLayout from "@/components/backstage/BackStageLayout";
import BackNewsForm from "@/components/backstage/BackNewsForm";

export default function NewsListPage() {
  
  return (
    <BackStageLayout pageName="消息列表">
      <div className="">
        <BackNewsForm />
      </div>
    </BackStageLayout>
  );
}
