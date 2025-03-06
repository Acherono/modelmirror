import { Layout } from "@/components/layout/Layout";
import HeroCarousel, { CarouselContent }  from "@/components/HeroCaruosel";

const carouselItems: CarouselContent[] = [
    {
      title: "ChatGPT-4.5: The Conversational Leader",
      description: "Power your applications with OpenAI’s most advanced chatbot. ChatGPT-4.5 excels in natural dialogue, code generation, and contextual understanding, delivering human-like interactions at scale.",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
    },
    {
      title: "Claude-3: Enterprise-Grade AI",
      description: "Anthropic’s Claude-3 combines cutting-edge performance with strict safety protocols. Ideal for professional use cases, it generates clear, concise, and reliable outputs while minimizing biases and risks.",
      imageUrl: "https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=2029&auto=format&fit=crop"
    },
    {
      title: "Qwen-Max: Multilingual Mastery",
      description: "Alibaba’s Qwen-Max is a powerhouse for global audiences. With exceptional multilingual support and advanced reasoning capabilities, it tackles complex tasks across industries and languages.",
      imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Gemini-Pro: Multimodal Innovation",
      description: "Google’s Gemini-Pro handles text, images, and code with equal ease. Its versatile architecture makes it perfect for creative tasks like design, coding, and multimodal content generation.",
      imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "PaLM2-Sud: Code & Logic Excellence",
      description: "Developed by Google, PaLM2-Sud specializes in code generation, logical reasoning, and technical writing. It’s the go-to model for developers, engineers, and data-driven workflows.",
      imageUrl: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?q=80&w=2064&auto=format&fit=crop"
    }
  ];

const Index = () => {
  return (
    <Layout>
      <HeroCarousel items={carouselItems} />
    </Layout>
  );
};

export default Index;
