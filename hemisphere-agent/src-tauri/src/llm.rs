use anyhow::Result;
use serde::{Deserialize, Serialize};
use tracing::info;

#[derive(Debug, Serialize)]
struct OpenAIRequest {
    model: String,
    messages: Vec<Message>,
    temperature: f32,
    max_tokens: u32,
}

#[derive(Debug, Serialize, Deserialize)]
struct Message {
    role: String,
    content: String,
}

#[derive(Debug, Deserialize)]
struct OpenAIResponse {
    choices: Vec<Choice>,
}

#[derive(Debug, Deserialize)]
struct Choice {
    message: Message,
}

pub async fn ask_llm(prompt: String) -> Result<String> {
    info!("Asking LLM: {}", prompt);
    
    // 環境変数からAPIキーを取得
    let api_key = std::env::var("OPENAI_API_KEY")
        .unwrap_or_else(|_| "dummy-key".to_string());
    
    // デモ用のレスポンス（実際のAPIキーがない場合）
    if api_key == "dummy-key" {
        info!("Using demo response (no API key set)");
        return Ok(match prompt.to_lowercase().as_str() {
            s if s.contains("こんにちは") || s.contains("hello") => {
                "こんにちは！今日はどんなお手伝いができますか？"
            }
            s if s.contains("天気") || s.contains("weather") => {
                "今日はいい天気ですね！作業が捗りそうです。"
            }
            s if s.contains("疲れ") || s.contains("tired") => {
                "お疲れ様です。少し休憩を取ってリフレッシュしましょう！"
            }
            _ => "なるほど、面白いですね！もっと詳しく教えてください。"
        }.to_string());
    }
    
    // OpenAI APIへのリクエスト
    let client = reqwest::Client::new();
    let request = OpenAIRequest {
        model: "gpt-3.5-turbo".to_string(),
        messages: vec![
            Message {
                role: "system".to_string(),
                content: "あなたは親切で可愛らしいデスクトップアシスタントです。ユーザーの作業をサポートし、励まし、時には休憩を促します。返答は簡潔に、1-2文程度でお願いします。".to_string(),
            },
            Message {
                role: "user".to_string(),
                content: prompt,
            },
        ],
        temperature: 0.7,
        max_tokens: 100,
    };
    
    let response = client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&request)
        .send()
        .await?;
    
    if response.status().is_success() {
        let data: OpenAIResponse = response.json().await?;
        if let Some(choice) = data.choices.first() {
            Ok(choice.message.content.clone())
        } else {
            Ok("すみません、うまく返答できませんでした。".to_string())
        }
    } else {
        info!("API error: {}", response.status());
        Ok("申し訳ございません、エラーが発生しました。".to_string())
    }
}