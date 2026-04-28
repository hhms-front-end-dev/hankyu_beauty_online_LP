async function initProductSliders() {
    try {
        // 1. JSONデータを取得
        const response = await fetch('./data/data.json'); 
        const data = await response.json();

        // 2. トピック1〜4ごとにデータを振り分けてHTMLを生成
        for (let i = 1; i <= 4; i++) {
            const wrapper = document.getElementById(`list-topic${i}`);
            if (!wrapper) continue;

            // 該当するtopic_idのデータだけ取り出す
            const filteredData = data.filter(item => Number(item.topic_id) === i);

            // スライドのHTMLを組み立て
            wrapper.innerHTML = filteredData.map(item => {
                // フォルダ名とファイル名を組み合わせてパスを作る
                const fullImagePath = `./img/${item.img_folder}/${item.img_name}`;

                // 「〜」の有無を判定（is_kara列が "TRUE" の場合のみ "～" を入れる）
                const kara = (item.is_kara === "TRUE") ? "～" : "";

                // 注意書き(attention)がある場合のみ表示
                const attentionTag = item.attention 
                    ? `<p class="point20-trend__item-attention">${item.attention}</p>` 
                    : '';

                return `
                    <div class="swiper-slide">
                        <a href="${item.url}">
                            <p class="point20-trend__item-img"><img src="${fullImagePath}" alt="${item.product_name}"></p>
                            <p class="point20-trend__item-title">${item.brand}</p>
                            <p class="point20-trend__item-spec">${item.product_name}</p>
                            <p class="point20-trend__item-tax">
                                ¥<span class="point20-trend__item-number">${item.price}</span> 
                                <span class="point20-trend__item-tax-mini">(税込)${kara}</span>
                            </p>
                            <p class="point20-trend__item-bai"><img src="./img/seasonal/icon_20bai.png" alt="ネットポイント20倍"></p>
                            <p class="point20-trend__item-point en">
                                ${item.points}<span class="point20-trend__item-point-text ja">ポイント(<span class="en">20</span>倍)${kara}</span>
                            </p>
                            ${attentionTag}
                        </a>
                    </div>
                `;
            }).join('');
        }

        // 3. すべてのHTML生成が終わってからSwiperを起動
        startSwiper();

    } catch (error) {
        console.error("データの読み込みまたはSwiperの初期化に失敗しました:", error);
    }
}

function startSwiper() {
    // ページ内のすべての .swiper クラスに対して初期化を行う
    new Swiper('#point20-trend .swiper', {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 3000 
        },
        centeredSlides: true, 
        slidesPerView: 2.6721,
        spaceBetween: "5.4%",
        
        pagination: {
            el: '#point20-trend .swiper-pagination',
            type: 'fraction',
            clickable: true,
        },
        
        navigation: {
            nextEl: "#point20-trend .swiper-button-next",
            prevEl: "#point20-trend .swiper-button-prev"
        },
    });
}

// 実行
initProductSliders();